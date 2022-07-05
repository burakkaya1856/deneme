import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { StorageService } from '../../../../shared/services/storage.service';
@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public walletNo: any;
  public isCollapsed = true;
  public customerDashboard: any;
  public activeTab = 'dashboard';
  public notifications = null;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private walletService: WalletService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.walletNo = data.wallet_no;
      this.storageService.setData('wallet_no', this.walletNo);
      this.walletService.getCustomerDashboard(this.walletNo).subscribe(data => {
        this.customerDashboard = data;
      });
    });
  }

  copy(value: string, message: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.alertService.setNoticeHandler(message, 'success');
  }

  ngOnDestroy() {
    this.storageService.flush('wallet_no');
  }
}
