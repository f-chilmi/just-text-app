import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { ListMessage } from '../_models/listMessage24';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getListMessage(): Observable<ListMessage> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.tokenStorage.getToken()}`
      })
    }
    return this.http.get<ListMessage>(URL + 'contact', httpHeader)
  }

}
