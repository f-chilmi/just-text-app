import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../_models/chatMessage24';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';
import { Chat } from '../_models/chats24';
import { ListMessage } from '../_models/listMessage24';
import { UserService } from './user.service';

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  websocket: WebSocket;
  chatMessages: ChatMessage[] = [];
  listMessage: ListMessage[] = [];
  userId: string = this.tokenStorage.getUser()._id;

  loadingChatList: boolean = false;
  errorChatList: string = '';

  loadingRoom: boolean = false;
  errorRoom: string = '';

  loadingSendNewMsg: boolean = false;
  errorSendNewMsg: string = '';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private user: UserService
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

      const incomingChat = { 
        contact_id: newMessage[0].contact_id, 
        message: newMessage[0].data, 
        sender_id: newMessage[0].from_user_id, 
        created_at: newMessage[0].CreatedAt
      }
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
    this.loadingRoom = true;
    this.getChat(id).subscribe(
      val => {
        val.data.forEach(el => {
          this.chatMessages.push(el);
        });
        this.loadingRoom = false;
      },
      err => {
        this.loadingRoom = false;
        this.errorRoom = err.error.error;
      }
    )
  }

  public sendMessage (chatMessages = ChatMessage) {
    this.websocket.send(JSON.stringify(chatMessages));
  }

  public newChat(phone: string, message: string): Observable<Chat> {
    return this.http.post<Chat>(URL + 'new-chat', { phone, message }, this.httpHeader)
  }

  public sendNewChat (phone: string, message: string) {
    this.chatMessages = []
    this.newChat(phone, message).subscribe(
      val => {
        this.refresh();
        this.loadingSendNewMsg = false;
      },
      err => {
        this.loadingSendNewMsg = false;
        this.errorSendNewMsg = err.error.error
      }
    )
  }

  public refresh() {
    this.chatMessages = [];
    this.loadingChatList = true;
    this.user.getListMessage().subscribe(
      val => {
        const data = val['data']
        data.forEach(element => {
          this.listMessage.push(element);
        });
        this.loadingChatList = false;
      },
      err => {
        this.loadingChatList = false;
        this.errorChatList = err.error.error;
      }
    )
  }

  public closeWebSocket () {
    this.websocket.close();
  }

}


