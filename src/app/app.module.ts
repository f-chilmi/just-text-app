import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './chatlist/search/search.component';
import { ListChatComponent } from './chatlist/list-chat/list-chat.component';
import { ContactNameComponent } from './chatlist/contact-name/contact-name.component';
import { ChatroomComponent } from './chatlist/chatroom/chatroom.component';

// import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatlistComponent,
    SearchComponent,
    ListChatComponent,
    ContactNameComponent,
    ChatroomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'chat', component: ChatlistComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
