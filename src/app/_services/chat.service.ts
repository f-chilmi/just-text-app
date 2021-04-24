import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class ChatService {

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

  getChat(id: number): Observable<any> {
    return this.http.get<any>(URL + `chat/${id}/nil`, this.httpHeader)
  }
  
  // newChat(phone: string, message: string): Observable<Chat> {
  //   return this.http.post<Chat>(URL + 'new_chat', { phone, message }, this.httpHeader)
  // }
}
