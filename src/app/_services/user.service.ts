import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListMessage } from '../_models/listMessage24';
import { HttpService } from './http.service';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpService
  ) { }

  getListMessage(): Observable<ListMessage> {
    return this.httpService.get(`${URL}contact`)
  }

}
