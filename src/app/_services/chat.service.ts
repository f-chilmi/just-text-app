import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';

import { Chat } from '../_modules/chat'

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  userId: number = this.tokenStorage.getUser()._id;

  private websocketUrl= new WebSocket(`wss://guarded-woodland-57057.herokuapp.com/ws/${this.userId}?access_token=${this.tokenStorage.getToken()}`);

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
  ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.tokenStorage.getToken()}`,
      'content-type': 'application/json'
    })
  }

  send(sendData): Observable<any> {
    console.log(sendData)
    const conn = this.websocketUrl
    conn.send(JSON.stringify(sendData))
    return;
  }

  getChat(id: number): Observable<any> {
    return this.http.get<any>(URL + `chat/${id}/nil`, this.httpHeader)
  }
  
  newChat(phone: string, message: string): Observable<Chat> {
    return this.http.post<Chat>(URL + 'new_chat', { phone, message }, this.httpHeader)
  }
}
