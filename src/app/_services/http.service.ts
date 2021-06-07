import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../_models/data';
import { DataObj } from '../_models/dataObj';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token = this.tokenStorage.getToken()
  errorMsg: string = ''

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'content-type': 'application/json'
    })
  }

  get(path) {
    return this.http.get<Data>(path, this.httpHeader)
  }

  post(path, data) {
    return this.http.post<Data>(path, data, this.httpHeader)
  }

  postAuth(path, data) {
    return this.http.post<DataObj>(path, data, this.httpHeader)
  }
  
}
