import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-contact-name',
  templateUrl: './contact-name.component.html',
  styleUrls: ['./contact-name.component.css']
})
export class ContactNameComponent implements OnInit {

  @Input() activeUser;

  constructor() { }

  ngOnInit(): void {
  }

}
