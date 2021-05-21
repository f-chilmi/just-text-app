import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Data } from '../_models/data';
import { HttpService } from './http.service';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpService
  ) { }

  getListMessage(): Observable<Data> {
    return this.httpService.get(`${URL}contact`)
  }

}
