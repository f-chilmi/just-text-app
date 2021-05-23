import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ChatService } from '../_services/chat.service';
import { WebsocketService } from '../_services/websocket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css'],
  providers: [WebsocketService, ChatService]
})

export class ChatlistComponent implements OnInit, OnDestroy {
  
  userId: string = this.tokenStorage.getUser()._id;
  activeUser: string = '';
  activeId: string = '';
  activeContactId: string = '';
  myName: string = '';
  myPhone: string = '';

  listMessage = this.websocketService.listMessage;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    public websocketService: WebsocketService,
    private modalService: NgbModal
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

  openModalLogout(content) {
    this.modalService.open(content)
  }

  logout() {
    this.tokenStorage.saveToken('');
    this.modalService.dismissAll();
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }
  }

}
