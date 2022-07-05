import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/http/auth/auth.service';
import { ThemeService } from '@shared/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('tr');
  }

  ngOnInit() {
    this.authService.authCheck();
  }
}
