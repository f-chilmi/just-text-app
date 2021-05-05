import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

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

  get(path) {
    return this.http.get<any>(path, this.httpHeader)
  }

  post(path, data) {
    return this.http.post<any>(path, data, this.httpHeader)
  }
  
}
