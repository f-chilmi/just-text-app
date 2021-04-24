import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, NgForm } from '@angular/forms';
import { ChatService } from 'src/app/_services/chat.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
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

}
