import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, StorageService, ThemeService } from '@shared/services';
import { AuthService, PanelService } from '../../../core/http/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public full_name = null;
  boxedLayout: boolean;
  menuToggle: boolean;
  mobileToggle: boolean;
  userMenuToggle: boolean;

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router,
    private storageService: StorageService,
    private panelService: PanelService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.authService.isAuthorized$.subscribe(isAuthorized => {
      if (isAuthorized) {
        this.authService.fullNameSub.subscribe(data => {
          this.full_name = data;

          if (!this.full_name) {
            this.full_name = this.storageService.getData('full_name');
          }
        });
      }
    });

    this.themeService.boxedLayout$.subscribe(
      response => (this.boxedLayout = response)
    );
    this.themeService.menuToggle$.subscribe(
      response => (this.menuToggle = response)
    );
    this.themeService.mobileToggle$.subscribe(
      response => (this.mobileToggle = response)
    );
  }

  logout() {
    this.panelService.panelLogout().subscribe(data => {
      this.alertService.setNoticeHandler(data.message, 'success', true);
      this.authService.flush();
      this.router.navigate(['/public/login']);
    });
  }
}
