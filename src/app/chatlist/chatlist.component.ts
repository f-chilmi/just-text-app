import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ChatService } from '../_services/chat.service';
import { Contact } from '../_modules/contact';
import { Chat } from '../_modules/chat';

const URL = `${environment.URL}`

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  items = [0, 1, 2, 3, 4,5, 6, 7, 8, 9];
  contactMessage: Contact;
  postNewChat: Chat;
  activeRoom: [];
  userId: number = this.tokenStorage.getUser()._id;
  activeUser: string = '';


  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private user: UserService,
    private chat: ChatService
  ) { }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }
    const userId = this.tokenStorage.getUser()._id;
    const conn = new WebSocket("wss://guarded-woodland-57057.herokuapp.com/ws/" + userId + "?access_token=" + this.tokenStorage.getToken());
    conn.onclose = function () {
      console.log("Connection closed.");
    };
    this.user.getContact().subscribe(val => {
      this.contactMessage = val
    })   
  }

  selectList($event) {
    // console.log($event)
    this.activeUser = $event.name
    this.chat.getChat($event.id).subscribe(val => this.activeRoom = val)
  }

  getContact() {
    this.user.getContact().subscribe(val => console.log('contact', val))
  }

  newChat() {
    this.chat.newChat('081111111111', 'HI').subscribe(val => console.log(val))
  }

}
