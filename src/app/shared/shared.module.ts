import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinner } from './loading/loading-spinner.component';

@NgModule({
  declarations: [
    LoadingSpinner
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    LoadingSpinner
  ]
})
export class SharedModule {}
