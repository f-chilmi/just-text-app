import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { RollbarService } from './rollbar.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Data } from '../_models/data';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private tokenService: TokenStorageService
  ) { }

  intercept(request: HttpRequest<Data>, next: HttpHandler): Observable<HttpEvent<Data>> {
    // const token: string = "invalid token";
    const token: string = this.tokenService.getToken();
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          const rollbar = this.injector.get(RollbarService);
          const errorMessage = `Error: ${error.error.message}`;
          // if (error.error instanceof ErrorEvent) {
          //   // client-side error
          //   errorMessage = `Error: ${error.error.message}`;
          // } else {
          //   // server-side error
          //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          // }
          window.alert(errorMessage);
          rollbar.error(error)
          return throwError(errorMessage);
        })
      )
  }
}