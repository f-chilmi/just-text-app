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
      const senderId = val[0].fromUserId
      const message = val[0].data
      const contactId = val[0].contactId
      const incomingChat = { contactId, message, senderId }
      this.activeRoom = [ incomingChat, ...this.activeRoom ]
    }
      
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

    // const senderId = $event.fromUserId
    // const message = $event.data
    // const contactId = $event.contactId
    // const incomingChat = { contactId, message, senderId }
    // this.activeRoom = [ incomingChat, ...this.activeRoom ]
  }

  getContact() {
    this.user.getContact().subscribe(val => console.log('contact', val))
  }

  newChat() {
    this.chat.newChat('081111111111', 'HI').subscribe(val => console.log(val))
  }

}
