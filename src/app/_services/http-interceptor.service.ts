
import { Injectable, Injector } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from "./token-storage.service";
 
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
 
  constructor(
    private router: Router,
    private tokenService: TokenStorageService
    ) {}
 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    const token: string = this.tokenService.getToken();
    // const token: string = 'invald token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
 
    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
        let errorMessage = '';
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
            errorMessage = `Error: ${error.error.message}`;
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:      //login
                this.router.navigateByUrl("/auth/login");
                console.log(`redirect to login`);
                handled = true;
                break;
              case 403:     //forbidden
                this.router.navigateByUrl("/auth/login");
                console.log(`redirect to login`);
                handled = true;
                break;
            }
          }
        }
        
        else {
          console.error("Other Errors");
        }
 
        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          errorMessage = `Error: ${error.error.message}`;
          window.alert(errorMessage);
          console.log('throw error back to to the subscriber');
          return throwError(error);
        }
 
      })
    )
  }
}