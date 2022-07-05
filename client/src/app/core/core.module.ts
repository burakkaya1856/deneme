import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// interceptors
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { UnauthorizedInterceptor } from '@core/interceptors/unauthorized.interceptor';
// configs
import { routeConfig, menuConfig, systemConfig } from '@core/configs';
//services
import { GlobalErrorHandler } from './services/global-error-handler';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: 'routeConfig', useValue: routeConfig },
    { provide: 'menuConfig', useValue: menuConfig },
    { provide: 'systemConfig', useValue: systemConfig }
  ]
})
export class CoreModule {}
