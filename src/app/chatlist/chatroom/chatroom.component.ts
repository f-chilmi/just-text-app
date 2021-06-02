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

  @Output() sendChat = new EventEmitter<{data: string, from_user_id: string, to_user_id: string, contact_id: string}>();

  constructor(
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      const sendData = {
        "data": this.message.trim(),
        "from_user_id" : this.websocketService.userId,
        "to_user_id": this.websocketService.activeContactId,
        "contact_id" : this.websocketService.activeId
      };
      let  textArea = document.getElementById("textarea") 
      textArea.style.height = '0px';
      if (this.message && this.message.trim() !== '') {
        this.myForm.reset()
        this.sendChat.emit(sendData)
      }
    }
  }

  send() {
    let  textArea = document.getElementById("textarea") 
    textArea.style.height = '0px';
    const sendData = {
      "data": this.message.trim(),
      "from_user_id" : this.websocketService.userId,
      "to_user_id": this.websocketService.activeContactId,
      "contact_id" : this.websocketService.activeId
    };
    if (this.message && this.message.trim() !== '') {
      this.myForm.reset()
      this.sendChat.emit(sendData)
    }
  }

  loadMore() {
    this.websocketService.loadMore(this.websocketService.activeId, this.websocketService.firstChatId)
  }

  scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start" })

    } catch(err) {
      console.log('error scroll to bottom: ', err)
    }
  };

  time(time) {
    return ComplexTime(time)
  }

  autogrow(){
    let  textArea = document.getElementById("textarea")
    let height = textArea.scrollHeight < 50 ? textArea.scrollHeight : 50
    textArea.style.height = '0px';
    textArea.style.height = height + 'px';
  }

}
