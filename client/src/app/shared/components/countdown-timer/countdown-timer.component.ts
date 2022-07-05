import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/http/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  expTime = null;
  seconds = null;
  blinkPoint = null;

  ngOnInit() {
    let user = this.authService.auth;
    if (user) {
      this.seconds = user ? user.exp - Math.floor(Date.now() / 1000) : 0;
      const interval = setInterval(() => {
        user = this.authService.auth;
        if (user) {
          const time = user.exp - Math.floor(Date.now() / 1000);
          this.blinkPoint = time;
          if (time > 0) {
            const minutes = Math.floor(time / 60);
            const seconds = time - minutes * 60;
            const finalTime =
              this.formatTime(minutes, '0', 2) +
              ':' +
              this.formatTime(seconds, '0', 2);
            this.expTime = finalTime;
          } else {
            this.authService.flushAndRedirect();
          }
        }
      }, 1000);
    }
  }

  formatTime(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
}
