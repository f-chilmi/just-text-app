import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = {
    name: null,
    phone: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  onSubmit(): void {
    const { name, phone, password } = this.form;
    this.authService.authLoading = true;
    this.authService.register(name, phone, password).subscribe(
      data => {
        this.isSignUpFailed = false;
        this.authService.authLoading = false;
        this.authService.login(phone, password).subscribe(
          data => {
            this.tokenStorage.saveToken(data.data.token);
            this.tokenStorage.saveUser(data.data);
  
            this.router.navigate(['chat']);
          },
        )
      }
    );
  }

}
