import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { WebsocketService } from 'src/app/_services/websocket.service';
import { ComplexTime } from 'src/app/_helpers/time';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollBottom') scrollBottom: ElementRef;
  @ViewChild('myForm', {static: false}) myForm: NgForm;

  message: string = '';

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

  onKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      const sendData = {
        "data": this.message,
        "from_user_id" : this.myId,
        "to_user_id": this.activeContactId,
        "contact_id" : this.activeId
      };
      if (this.message !== '' && this.message.length > 0) {
        this.myForm.reset()
        this.sendChat.emit(sendData)
      }
    }
  }

  send() {
    const sendData = {
      "data": this.message,
      "from_user_id" : this.myId,
      "to_user_id": this.activeContactId,
      "contact_id" : this.activeId
    };
    if (this.message !== '') {
      this.myForm.reset()
      this.sendChat.emit(sendData)
    }
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

  time(time) {
    return ComplexTime(time)
  }

}
