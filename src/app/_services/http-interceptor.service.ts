import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { RollbarService } from './rollbar.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Data } from '../_models/data';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private tokenService: TokenStorageService,
    private httpService: HttpService,

    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<Data>, next: HttpHandler): Observable<HttpEvent<Data>> {

    const token: string = this.tokenService.getToken();
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {

          this.httpService.errorMsg = error.error.message;
          this.authService.authLoading = false;

          const rollbar = this.injector.get(RollbarService);
          const errorMessage = `Error: ${error.error.message}`;

          rollbar.error(error)
          return throwError(errorMessage);
        })
      )
  }
}