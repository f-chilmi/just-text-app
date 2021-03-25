import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';

import { Chat } from '../_modules/chat'
import { stringify } from '@angular/compiler/src/util';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.tokenStorage.getToken()}`,
      'content-type': 'application/json'
    })
  }

  newChat(phone: string, message: string): Observable<Chat> {
    return this.http.post<Chat>(URL + 'new_chat', { phone, message }, this.httpHeader)
  }
}
