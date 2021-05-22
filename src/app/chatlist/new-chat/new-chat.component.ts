import { Component, OnInit, DoCheck } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Output, EventEmitter } from "@angular/core";
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit, DoCheck{

  closeResult: string;
  form = {
    phone: null,
    message: null
  };
  isSuccessful = false;
  errorMessage: string;
  modalReference = null;

  @Output() refresh = new EventEmitter<{}>();
  
  constructor(
    private modalService: NgbModal,
    public websocketService: WebsocketService
    ) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.websocketService.successSend) {
      this.modalService.dismissAll();
    }
  }

  open(content) {
    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason): string {
    switch (reason) {
      case ModalDismissReasons.ESC: {
        return 'by pressing ESC';
      }
      case ModalDismissReasons.BACKDROP_CLICK: {
        return 'by clicking on a backdrop';
      }
      default: {
        return `with ${reason}`
      }
    }
  }

  onSubmit(): void {
    const { phone, message } = this.form;
    this.websocketService.sendNewChat(phone, message)
  }

}
