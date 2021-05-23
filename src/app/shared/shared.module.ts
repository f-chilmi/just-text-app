import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingList } from './loadingList/loading-list.component';
import { ErrorModal } from './errorModal/error-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorInterceptor } from '../_services/http-interceptor.service';

@NgModule({
  declarations: [
    LoadingList,
    ErrorModal,
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    LoadingList,
    ErrorModal,
  ],
  providers: [HttpErrorInterceptor]
})
export class SharedModule {}
