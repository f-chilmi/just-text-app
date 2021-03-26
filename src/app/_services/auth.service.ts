import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
    private http: HttpClient
  ) { }

  login(phone: string, password: string): Observable<any> {
    return this.http.post(URL + 'login', {
      phone,
      password
    }, httpOptions)
  }

  register(name: string, phone: string, password: string): Observable<any> {
    return this.http.post(URL + 'register', {
      name,
      phone,
      password
    }, httpOptions);
  }

}
