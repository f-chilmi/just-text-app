import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-contact-name',
  templateUrl: './contact-name.component.html',
  styleUrls: ['./contact-name.component.css']
})
export class ContactNameComponent implements OnInit {

  @Input() activeUser;

  constructor(
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
  }

}
