import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  noticeSub: ReplaySubject<{
    message: string;
    type: string;
    isPopup?: boolean;
  }>;

  constructor() {
    this.noticeSub = new ReplaySubject(null);
  }

  setNoticeHandler(message: string, type?: string, isPopup?: boolean) {
    this.noticeSub.next({
      message: message,
      type: type,
      isPopup: isPopup
    });
  }
}
