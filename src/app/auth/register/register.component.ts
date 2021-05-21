import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = {
    name: null,
    phone: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.isSuccessful) this.router.navigate(['/'])
  }

  onSubmit(): void {
    const { name, phone, password } = this.form;
    this.isLoading = true;
    this.authService.register(name, phone, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isLoading = false;
      },
      err => {
        this.errorMessage = err.error.error;
        this.isSignUpFailed = true;
        this.isLoading = false;
      }
    );
  }

}
