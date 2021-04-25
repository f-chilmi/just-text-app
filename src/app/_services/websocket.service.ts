import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../_models/chatMessage24';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';
import { Chat } from '../_models/chats24';
import { ListMessage } from '../_models/listMessage24';
import { UserService } from './user.service';
import orderBy from 'lodash/orderBy'

const URL = environment.URL

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  websocket: WebSocket;
  chatMessages: ChatMessage[] = [];
  firstChatId: any;
  listMessage: ListMessage[] = [];
  userId: string = this.tokenStorage.getUser()._id;

  loadingChatList: boolean = false;
  errorChatList: string = '';

  loadingRoom: boolean = false;
  errorRoom: string = '';

  loadingSendNewMsg: boolean = false;
  errorSendNewMsg: string = '';
  successSend: boolean = false;

  loadingLoadMore: boolean = false;

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
      console.log(newMessage)

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
    this.chatMessages = [];
    this.loadingRoom = true;
    const newMessage = [];
    this.getChat(id).subscribe(
      val => {
        val.data.forEach(el => {
          newMessage.push(el);
        });
        this.chatMessages = orderBy(newMessage, ['created_at'], ['asc'])
        this.firstChatId = orderBy(newMessage, ['created_at'], ['asc'])[0]._id
        this.loadingRoom = false;
      },
      err => {
        this.loadingRoom = false;
        this.errorRoom = err.error.error;
      }
    )
  }

  public loadMoreChat(idContact: number, idChat: number): Observable<any> {
    return this.http.get<any>(URL + `chat/${idContact}/${idChat}`, this.httpHeader)
  }

  public loadMore (idContact: number, idChat: number) {
    this.loadingLoadMore = true;
    const newMessage = this.chatMessages;
    this.loadMoreChat(idContact, idChat).subscribe(
      val => {
        val.data.forEach(el => {
          newMessage.push(el);
        });
        this.firstChatId = orderBy(newMessage, ['created_at'], ['asc'])[0]._id;
        this.chatMessages = orderBy(newMessage, ['created_at'], ['asc']);
        this.loadingLoadMore = false;
      },
      err => {
        this.loadingLoadMore = false;
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
    this.loadingSendNewMsg = true;
    this.chatMessages = [];
    this.successSend = false;
    this.newChat(phone, message).subscribe(
      val => {
        this.refresh();
        this.loadingSendNewMsg = false;
        this.successSend = true;
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
    const newList = []
    this.user.getListMessage().subscribe(
      val => {
        const data = val['data']
        data.forEach(element => {
          newList.push(element);
        });
        this.listMessage = orderBy(newList, ['created_at'], ['desc']);
        this.loadingChatList = false;
        console.log(this.listMessage)
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


