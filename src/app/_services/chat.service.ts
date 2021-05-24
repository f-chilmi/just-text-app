import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { Data } from '../_models/data';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private httpService: HttpService,
  ) { }

  getChat(id: number): Observable<Data> {
    return this.httpService.get(`${URL}chat/${id}/nil`)
  }
}
