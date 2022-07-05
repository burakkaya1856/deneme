import { Component, OnInit } from '@angular/core';
import { AuthService, SettingsService } from '@app/core/http';
import { StorageService } from '@app/shared/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private settingService: SettingsService,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.settingService.getEnums().subscribe(data => {
      this.settingService.handlerChangeEnumSubject(data);
    });
  }

  ngOnInit() {
    this.authService.handlerChangefullNameSub(
      this.storageService.getData('full_name')
    );
  }
}
