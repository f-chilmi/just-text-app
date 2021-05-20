import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { HttpService } from './http.service';
import { Data } from '../_models/data';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private httpService: HttpService,
    private tokenStorage: TokenStorageService,
  ) { }

  getChat(id: number): Observable<Data> {
    return this.httpService.get(`${URL}chat/${id}/nil`)
  }
}
