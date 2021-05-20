import { Injectable } from '@angular/core';
import { ChatMessage } from '../_models/chatMessage24';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';
import { ListMessage } from '../_models/listMessage24';
import { UserService } from './user.service';
import orderBy from 'lodash/orderBy'
import { HttpService } from './http.service';

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

  activeId: any;

  constructor(
    private httpService: HttpService,
    private tokenStorage: TokenStorageService,
    private user: UserService
  ) { }

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

      if (this.activeId === newMessage[0].contact_id) {
        const incomingChat = { 
          contact_id: newMessage[0].contact_id, 
          message: newMessage[0].data, 
          sender_id: newMessage[0].from_user_id, 
          created_at: newMessage[0].CreatedAt
        }
        this.chatMessages.push(incomingChat);
      }
      
    }

    this.websocket.onclose = (event) => {
      console.log('close: ', event);
    }
  }

  public subscribeChat (id: number) {
    this.chatMessages = [];
    this.loadingRoom = true;
    const newMessage = [];
    this.httpService.get(`${URL}chat/${id}/nil`).subscribe(
      val => {
        this.activeId = id
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

  public loadMore (idContact: number, idChat: number) {
    this.loadingLoadMore = true;
    const newMessage = this.chatMessages;
    this.httpService.get(`${URL}chat/${idContact}/${idChat}`).subscribe(
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

  public sendNewChat (phone: string, message: string) {
    this.loadingSendNewMsg = true;
    this.chatMessages = [];
    this.successSend = false;
    this.httpService.post(`${URL}new-chat`, { phone, message }).subscribe(
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


