import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ChatService } from '../_services/chat.service';
import { WebsocketService } from '../_services/websocket.service';
import { ChatMessage } from '../_models/chatMessage24';
import { ListMessage } from '../_models/listMessage24';

const URL = `${environment.URL}`

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css'],
  providers: [WebsocketService, ChatService]
})

export class ChatlistComponent implements OnInit, OnDestroy {
  
  userId: number = this.tokenStorage.getUser()._id;
  activeUser: string = '';
  activeId: string = '';
  activeContactId: string = '';
  myName: string = '';
  myPhone: string = '';

  listMessage = this.websocketService.listMessage;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private user: UserService,

    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.websocketService.refresh();

    this.myName = this.tokenStorage.getUser().name
    this.myPhone = this.tokenStorage.getUser().phone

    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }

    this.websocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.websocketService.closeWebSocket();
  }


  selectList($event) {
    this.activeUser = $event.name
    this.activeId = $event.id
    this.activeContactId = $event.contactId
    this.websocketService.subscribeChat($event.id);
  }

  sendChat($event) {
    this.websocketService.sendMessage($event)
  }

}
