import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { DataObj } from '../_models/dataObj';
import { Data } from '../_models/data';

const URL = `${environment.URL}auth/`

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService
  ) { }

  login(phone: string, password: string): Observable<DataObj> {
    return this.httpService.postAuth(`${URL}login`, { phone, password })
  }

  register(name: string, phone: string, password: string): Observable<DataObj> {
    return this.httpService.postAuth(`${URL}register`, { name, phone, password })
  }

}
