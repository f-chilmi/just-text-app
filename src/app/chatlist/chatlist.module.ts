import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatlistComponent } from './chatlist.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ContactNameComponent } from './contact-name/contact-name.component';
import { ListChatComponent } from './list-chat/list-chat.component';
import { NewChatComponent } from './new-chat/new-chat.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChatlistComponent,
    ChatlistComponent,
    ListChatComponent,
    ContactNameComponent,
    ChatroomComponent,
    NewChatComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    // NgbModalRef,
    RouterModule.forChild([
      { path: '', component: ChatlistComponent },
    ]),
  ],
})
export class ChatModule { }
