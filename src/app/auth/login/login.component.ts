import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    public authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['chat']);
    }
  }

  onSubmit(form: NgForm) {
    this.authService.authLoading = true;
    this.authService.login(form.value.phone, form.value.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.data.token);
        this.tokenStorage.saveUser(data.data);

        this.isLoggedIn = true;
        this.router.navigate(['chat']);
        this.authService.authLoading = false;
      }
    );
  }

}
