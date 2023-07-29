import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string | null = sessionStorage.getItem('token');
    const cloneReq = request.clone({headers: request.headers.set('Authorization', token != null ? token : '')});
    if (request.url.includes('http://localhost:8080') && 
        !request.url.includes('/login') && 
        !request.url.includes('/users/register')
        ){
      request = cloneReq;
    }
    return next.handle(request);
  }
}
