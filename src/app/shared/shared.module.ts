import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingList } from './loadingList/loading-list.component';

@NgModule({
  declarations: [
    LoadingList
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    LoadingList
  ]
})
export class SharedModule {}
