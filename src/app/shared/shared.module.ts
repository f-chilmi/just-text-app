import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinner } from './loading/loading-spinner.component';
import { LoadingList } from './loadingList/loading-list.component';

@NgModule({
  declarations: [
    LoadingSpinner,
    LoadingList
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    LoadingSpinner,
    LoadingList
  ]
})
export class SharedModule {}
