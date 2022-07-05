import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../http/index';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.authService.auth;
    if (user && user.token) {
      const request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + user.token)
      });
      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }
}
