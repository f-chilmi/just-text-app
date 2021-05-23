import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorInterceptor } from 'src/app/_services/http-interceptor.service';
import { HttpService } from 'src/app/_services/http.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
})

export class ErrorModal implements OnInit, DoCheck {
  @ViewChild('myModal') myModal;
  
  modalOpen: boolean = false;

  constructor(
    private modalService: NgbModal,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public httpErrorInterceptor: HttpErrorInterceptor,
    public httpService: HttpService,
    
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.httpService.errorMsg === "Something unexpectedly went wrong!" && !this.modalOpen) {
      setTimeout(() => {
        window.location.reload();
        this.closeModal();
        this.httpService.errorMsg = '';
      }, 2000);
      this.openModal();
    }
    if (this.httpService.errorMsg.includes('token') && !this.modalOpen) {
      setTimeout(() => {
        this.tokenStorage.saveToken('');
        this.closeModal();
        this.httpService.errorMsg = '';
        if (!this.tokenStorage.getToken()) {
          this.router.navigate(['/']);
        }
      }, 2000);
      this.openModal();
    }
    if (this.httpService.errorMsg !== '' && !this.modalOpen) {
      setTimeout(() => {
        this.closeModal();
        this.httpService.errorMsg = '';
      }, 3000);
      this.openModal()
    }
  }

  openModal() {
    this.modalOpen = true;
    this.modalService.open(this.myModal);
  }

  closeModal() {
    this.modalOpen = false;
    this.modalService.dismissAll();
    this.httpService.errorMsg = '';
  }

}
