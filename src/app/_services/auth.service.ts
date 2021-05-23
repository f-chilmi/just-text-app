import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { DataObj } from '../_models/dataObj';

const URL = `${environment.URL}auth/`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authLoading: boolean = false;
  authError: string = '';

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
