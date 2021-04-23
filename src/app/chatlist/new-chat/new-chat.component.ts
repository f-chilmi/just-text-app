import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/app/_services/chat.service';
import { Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {
  title = 'appBootstrap';
  isLoading: boolean = false;
  closeResult: string;
  form: any = {
    phone: null,
    message: null
  };
  errorMessage: string;

  @Output() refresh = new EventEmitter<{}>();
  
  constructor(
    private modalService: NgbModal,
    private chat: ChatService,
    ) {}

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      const { phone, message } = this.form;
      // this.closeResult = `Closed with: ${res}`;
      this.isLoading = true;
      this.chat.newChat(phone, message).subscribe(
        data => {
          this.isLoading = false;
          new this.refresh()
        },
        err => {
          this.errorMessage = err.error.error;
          this.isLoading = false;
        }
      )
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    // this.authService.login(form.value.phone, form.value.password).subscribe(
    //   data => {
    //     this.tokenStorage.saveToken(data.data.token);
    //     this.tokenStorage.saveUser(data.data);

    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.router.navigate(['chat']);
    //     this.isLoading = false;
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //     this.isLoading = false;
    //   }
    // );
    // this.modalService.close('Save click')
  }

}
