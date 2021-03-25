import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { ListChatComponent } from './chatlist/list-chat/list-chat.component';
import { ContactNameComponent } from './chatlist/contact-name/contact-name.component';
import { ChatroomComponent } from './chatlist/chatroom/chatroom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewChatComponent } from './chatlist/new-chat/new-chat.component';

// import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatlistComponent,
    ListChatComponent,
    ContactNameComponent,
    ChatroomComponent,
    NewChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'chat', component: ChatlistComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
