import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../_models/chatMessage24';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';
import { Chat } from '../_models/chats24';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  websocket: WebSocket;
  chatMessages: ChatMessage[] = [];
  userId: string = this.tokenStorage.getUser()._id;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
  ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.tokenStorage.getToken()}`,
      'content-type': 'application/json'
    })
  }

  public openWebSocket() {
    this.websocket = new WebSocket(`wss://guarded-woodland-57057.herokuapp.com/ws/${this.userId}?access_token=${this.tokenStorage.getToken()}`);

    this.websocket.onopen = (event) => {
      console.log('open: ', event);
    }

    this.websocket.onmessage = (event) => {
      let messages = event.data.split('\n');
      const newMessage = messages.map(element => {
        const formatted = JSON.parse(element)
        return formatted
      });
      const from_user_id: string = newMessage[0].from_user_id
      const to_user_id: string = newMessage[0].to_user_id
      const data: string = newMessage[0].data
      const contact_id: string = newMessage[0].contact_id
      const created_at: string = newMessage[0].created_at
      const incomingChat = { contact_id, message: data, sender_id: from_user_id, created_at }
      this.chatMessages.push(incomingChat);
      console.log('onmessage: ', this.chatMessages)
    }

    this.websocket.onclose = (event) => {
      console.log('close: ', event);
    }
  }

  public getChat(id: number): Observable<any> {
    return this.http.get<any>(URL + `chat/${id}/nil`, this.httpHeader)
  }

  public subscribeChat (id: number) {
    this.chatMessages = []
    this.getChat(id).subscribe(val => {
      val.data.forEach(el => {
        this.chatMessages.push(el)
      });
      console.log('subscribe', this.chatMessages)
    })
  }

  public sendMessage (chatMessages = ChatMessage) {
    this.websocket.send(JSON.stringify(chatMessages));
  }

  public newChat(phone: string, message: string): Observable<Chat> {
    return this.http.post<Chat>(URL + 'new-chat', { phone, message }, this.httpHeader)
  }

  public sendNewChat (phone: string, message: string) {
    this.chatMessages = []
    this.newChat(phone, message).subscribe()
  }

  public closeWebSocket () {
    this.websocket.close();
  }

}


