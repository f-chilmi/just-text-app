import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css']
})
export class ListChatComponent implements OnInit {
  @Input() items;
  @Input() contactMessage;
  @Input() myId;

  @Output() selectList = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
