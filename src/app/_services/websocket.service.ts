// import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs';
// // import { Observable } from 'rxjs/Rx';

// @Injectable({
//   providedIn: 'root'
// })

// export class WebsocketService {

//   constructor() { }

//   private subject: Rx.Subject<MessageEvent>;

//   public connect(url: string): Rx.Subject<MessageEvent> {
//     if (!this.subject) {
//       this.subject = this.create(url);
//     }
//     return this.subject
//   }

//   private create(url: string): Rx.Subject<MessageEvent> {
//     let ws = new WebSocket(url);

//     let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
//       ws.onmessage = obs.next.bind(obs);
//       ws.onerror = obs.error.bind(obs);
//       ws.onclose = obs.complete.bind(obs);

//       return ws.close.bind(ws);
//     });

//     let observer = {
//       next: (data: Object) => {
//         if (ws.readyState === WebSocket.OPEN) {
//           ws.send(JSON.stringify(data));
//         }
//       }
//     };

//     return Rx.Subject.create(observer, observable);
//   }
// }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../_models/chatMessage24';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';

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
    this.getChat(id).subscribe(val => {
      val.data.forEach(el => {
        this.chatMessages.push(el)
      });
      console.log('subscribe', this.chatMessages)
    })
  }

  public sendMessage (chatMessages = ChatMessage) {
    this.websocket.send(JSON.stringify(chatMessages));
    console.log('send: ', this.chatMessages)
  }

  public closeWebSocket () {
    this.websocket.close();
  }

}


