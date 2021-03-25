import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from '../_modules/contact';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  getContact(): Observable<Contact> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.tokenStorage.getToken()}`
      })
    }
    return this.http.get<Contact>(URL + 'contact', httpHeader)
  }

  // getContact() {
  //   const httpHeader = {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${this.tokenStorage.getToken()}`,
  //       'Access-Control-Allow-Origin' : '*'
  //     })
  //   }
  //   return this.http.get(URL + 'contact', httpHeader).subscribe(res => {
  //     console.log(res)
  //   })
  // }

}
