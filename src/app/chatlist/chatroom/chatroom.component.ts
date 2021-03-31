import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, NgForm } from '@angular/forms';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  message: string = '';

  [x: string]: any;
  @Input() activeRoom;
  @Input() activeId;
  @Input() myId;
  @Input() activeContactId;

  @Output() sendChat = new EventEmitter<{data: string, fromUserId: string, toUserId: string, contactId: string}>();

  constructor(
    private chat: ChatService
  ) { }

  ngOnInit(): void {
  }

  onKey(event: any) {
    this.message = event.target.value;
  }

  send() {
    const sendData = {
      "data": this.message,
      "fromUserId" : this.myId,
      "toUserId": this.activeContactId,
      "contactId" : this.activeId
    };
    this.message = ''
    this.sendChat.emit(sendData)
  }

}
