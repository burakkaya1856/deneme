import { ErrorHandler, Injectable } from '@angular/core';
import { AlertService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private alertService: AlertService) {}

  handleError(error: any): void {
    let message = '';

    if (!navigator.onLine) {
      message = 'Lütfen internet bağlantınızı kontrol ediniz.';
    } else {
      if (error.status === 401) {
        message = 'Oturum süreniz dolmuştur. Lütfen tekrardan giriş yapınız.';
      } else {
        message = error.error.error_message
          ? error.error.error_message
          : error.error.detail[0].msg;
      }
    }

    this.alertService.setNoticeHandler(message, 'warning');
  }
}
