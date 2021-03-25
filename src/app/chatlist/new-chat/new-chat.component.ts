import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {
  modalShow: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
