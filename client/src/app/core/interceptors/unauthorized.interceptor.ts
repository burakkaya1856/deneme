import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from '../http/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { systemConfig } from '@core/configs';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (response: any) => {
          if (response instanceof HttpResponse) {
            if (response.body && response.body.code === '401') {
              this.authService.flush();
              throw new Error(response.body.message || 'Token is expired.');
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.authService.flush();
              this.router.navigate([systemConfig.unauthorizedRedirectTo]);
            }
          }
        }
      )
    );
  }
}
