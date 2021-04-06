import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ChatService } from '../_services/chat.service';
import { Contact } from '../_modules/contact';
import { Chat } from '../_modules/chat';
import { WebsocketService } from '../_services/websocket.service';

const URL = `${environment.URL}`

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css'],
  providers: [WebsocketService, ChatService]
})

export class ChatlistComponent implements OnInit {
  items = [0, 1, 2, 3, 4,5, 6, 7, 8, 9];
  contactMessage: Contact;
  postNewChat: Chat;
  activeRoom: Array<object>;
  userId: number = this.tokenStorage.getUser()._id;
  activeUser: string = '';
  activeId: string = '';
  activeContactId: string = '';
  myName: string = '';
  myPhone: string = '';

  private websocketUrl= new WebSocket(`wss://guarded-woodland-57057.herokuapp.com/ws/${this.userId}?access_token=${this.tokenStorage.getToken()}`);

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private user: UserService,
    private chat: ChatService,
  ) { }

  ngOnInit(): void {
    this.user.getContact().subscribe(val => {
      this.contactMessage = val['data']
    })

    this.myName = this.tokenStorage.getUser().name
    this.myPhone = this.tokenStorage.getUser().phone

    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }

    const conn = this.websocketUrl
    conn.onclose = function () {
      console.log("Connection closed.");
    }
    conn.onmessage = function(evt) {
      let messages = evt.data.split('\n');
      const newMessage = messages.map(element => {
        const formatted = JSON.parse(element)
        return formatted
      });
      listen(newMessage)
    }

    const listen = (val) => {
      const sender_id = val[0].from_user_id
      const message = val[0].data
      const contact_id = val[0].contact_id
      const incomingChat = { contact_id, message, sender_id }
      const created_at = val[0].CreatedAt
      this.activeRoom['data'] = [ incomingChat, ...this.activeRoom['data'] ]
      console.log(val)
      console.log(this.activeRoom)
    }

    

    // this.activeRoom.sort(function(a, b){
    //   if(a.date > b.date) return -1;
    //   if(a.date < b.date) return 1;
    // return 0;
    // })
  }

  selectList($event) {
    this.activeUser = $event.name
    this.activeId = $event.id
    this.activeContactId = $event.contactId
    this.chat.getChat($event.id).subscribe(val => this.activeRoom = val)
  }

  sendChat($event) {
    const conn = this.websocketUrl
    conn.send(JSON.stringify($event))
  }

  getContact() {
    this.user.getContact().subscribe(val => console.log('contact', val))
  }

  newChat() {
    this.chat.newChat('081111111111', 'HI').subscribe(val => console.log(val))
  }

}
