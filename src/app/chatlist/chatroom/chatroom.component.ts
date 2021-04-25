import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollBottom') scrollBottom: ElementRef;

  message: string = '';

  [x: string]: any;
  @Input() chatMessage;
  @Input() activeId;
  @Input() myId;
  @Input() activeContactId;

  @Output() sendChat = new EventEmitter<{data: string, from_user_id: string, to_user_id: string, contact_id: string}>();

  constructor(
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    // this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onKey(event: any) {
    
    if (event.keyCode === 13) {
      const sendData = {
        "data": this.message,
        "from_user_id" : this.myId,
        "to_user_id": this.activeContactId,
        "contact_id" : this.activeId
      };
      this.message = ''
      this.sendChat.emit(sendData)
    } 
  }

  send() {
    const sendData = {
      "data": this.message,
      "from_user_id" : this.myId,
      "to_user_id": this.activeContactId,
      "contact_id" : this.activeId
    };
    this.message = ''
    this.sendChat.emit(sendData)
  }

  loadMore() {
    this.websocketService.loadMore(this.activeId, this.websocketService.firstChatId)
  }

  scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start" })

    } catch(err) {
      console.log('error scroll to bottom:', err)
    }
  };

}
