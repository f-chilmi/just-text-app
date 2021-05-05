import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';

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

  login(phone: string, password: string): Observable<any> {
    return this.httpService.post(`${URL}login`, { phone, password })
  }

  register(name: string, phone: string, password: string): Observable<any> {
    return this.httpService.post(`${URL}register`, { name, phone, password })
  }

}
