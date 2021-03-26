import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  @Input() activeRoom;
  @Input() myId;

  constructor() { }

  ngOnInit(): void {
  }

}
