import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  items = [0, 1, 2, 3, 4,5, 6, 7, 8, 9]
  constructor() { }

  ngOnInit(): void {
  }

}
