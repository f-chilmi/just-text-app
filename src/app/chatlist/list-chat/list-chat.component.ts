import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { WebsocketService } from 'src/app/_services/websocket.service';
import { ComplexTime } from 'src/app/_helpers/time';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css']
})
export class ListChatComponent implements OnInit {

  @Input() myId;

  @Output() selectList = new EventEmitter<{id: string, name: string}>();
  
  constructor(
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  time(time) {
    return ComplexTime(time)
  }

}
