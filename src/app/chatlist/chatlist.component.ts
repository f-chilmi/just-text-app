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
      this.contactMessage = val
    })

    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }

    const conn = this.websocketUrl
    const userId = this.tokenStorage.getUser()._id
    conn.onclose = function () {
      console.log("Connection closed.");
    }
    conn.onmessage = function(evt) {
      let messages = evt.data.split('\n');
      for (let i = 0; i < messages.length; i++) {
        var plainMessage = messages[i];
        var formattedMessage = JSON.parse(plainMessage);
        console.log(formattedMessage)
        
      }
    }
    // const userId = this.tokenStorage.getUser()._id;
    // const conn = new WebSocket("wss://guarded-woodland-57057.herokuapp.com/ws/" + userId + "?access_token=" + this.tokenStorage.getToken());
    // conn.onclose = function () {
    //   console.log("Connection closed.");
    // };

    // let newRoom: Array<object>
    // conn.onmessage = function (evt) {
    // let messages = evt.data.split('\n');
    // for (let i = 0; i < messages.length; i++) {
    //   var plainMessage = messages[i];
    //   var formattedMessage = JSON.parse(plainMessage);
    //   //this means, when incoming message is an acknowledge that current user message was sent to receiver, then..
    //   if(formattedMessage['fromUserId'] == userId || formattedMessage['toUserId'] == userId) {
    //     //if current user is opening that chat log according to this message
    //     const newMessage: Object = {
    //       contactId: formattedMessage['fromUserId'] == userId ? formattedMessage['toUserId'] : formattedMessage['fromUserId'],
    //       message: formattedMessage.data,
    //       senderId: formattedMessage['fromUserId'] == userId ? formattedMessage['fromUserId'] : formattedMessage['toUserId']
    //     }
    //     newRoom.push(newMessage)
    //     console.log('newMessage', newMessage)
    //   } else { //this means, when incoming message is from other people send message to current user
    //     //if current user is opening that chat log according to this message
    //     console.log('elseFormattedMessage', formattedMessage)
    //   }
    // }};
      
  }

  selectList($event) {
    this.activeUser = $event.name
    this.activeId = $event.id
    this.activeContactId = $event.contactId
    this.chat.getChat($event.id).subscribe(val => this.activeRoom = val)
  }

  send(message) {
    console.log(message)
  }

  getContact() {
    this.user.getContact().subscribe(val => console.log('contact', val))
  }

  newChat() {
    this.chat.newChat('081111111111', 'HI').subscribe(val => console.log(val))
  }

}
