import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css']
})
export class ListChatComponent implements OnInit {

  @Input() listMessage;
  @Input() myId;

  @Output() selectList = new EventEmitter<{id: string, name: string}>();
  
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
