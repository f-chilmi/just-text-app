import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const URL = `${environment.URL}`

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  items = [0, 1, 2, 3, 4,5, 6, 7, 8, 9]
  contact = this.user.getContact();
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private user: UserService,
  ) { }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }
    const userId = this.tokenStorage.getUser().ID;
    const conn = new WebSocket("wss://guarded-woodland-57057.herokuapp.com/api/ws/" + userId + "?access_token=" + this.tokenStorage.getToken());
    conn.onclose = function () {
      console.log("Connection closed.");
    };
    this.user.getContact()
    console.log(this.user.getContact())
  }

}
