import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { ChatService } from '../_services/chat.service';
import { WebsocketService } from '../_services/websocket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css'],
  providers: [WebsocketService, ChatService]
})

export class ChatlistComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    public websocketService: WebsocketService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.websocketService.refresh();

    this.websocketService.myName = this.tokenStorage.getUser().name
    this.websocketService.myPhone = this.tokenStorage.getUser().phone
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }

    this.websocketService.openWebSocket();
  }

  selectList($event) {
    this.websocketService.activeUser = $event.name
    this.websocketService.activeId = $event.id
    this.websocketService.activeContactId = $event.contactId
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
