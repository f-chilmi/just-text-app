import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatlistComponent } from './chatlist.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: ChatlistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
