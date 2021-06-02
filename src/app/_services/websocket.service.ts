import { ChangeDetectorRef, Injectable } from '@angular/core';
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
  firstChatId: string;
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

  activeId: string;
  activeUser: string;
  activeContactId: string;
  myName: string;
  myPhone: string;

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
      window.location.reload();
      this.httpService.errorMsg = "Something unexpectedly went wrong!"
    }
  }

  public subscribeChat (id: string) {
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
      }
    )
  }

  public loadMore (idContact: number, idChat: string) {
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
      }
    )
  }

  public sendMessage (chatMessages = ChatMessage) {
    this.websocket.send(JSON.stringify(chatMessages));
  }

  public sendNewChat (phone: string, message: string) {
    this.loadingSendNewMsg = true;
    this.chatMessages = [];
    this.activeId = '';
    this.successSend = false;
    this.httpService.post(`${URL}new-chat`, { phone, message }).subscribe(
      val => {
        let friend
        this.listMessage.forEach(el => {
          if (el._id === val.data['contact_id']) {
            friend = el.users_info.filter(i => i['name'] !== this.myName)[0]['name']
          }
        })
        this.activeUser = friend
        this.subscribeChat(val.data['contact_id'])
        this.refresh();
        this.loadingSendNewMsg = false;
        this.successSend = true;
        setTimeout(() => {
          this.successSend = false
        }, 500);
      },
      err => {
        this.loadingSendNewMsg = false;
        throw new Error(err);
        
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
        data !== null && data.forEach(element => {
          newList.push(element);
        });
        this.listMessage = orderBy(newList, ['created_at'], ['desc']);
        this.loadingChatList = false;
      },
      err => {
        this.loadingChatList = false;
      }
    )
  }

  public closeWebSocket () {
    this.websocket.close();
  }

}


