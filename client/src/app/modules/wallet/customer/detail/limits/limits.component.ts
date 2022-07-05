import { Component, OnInit } from '@angular/core';
import { WalletService } from '@app/core/http';
import { StorageService } from '../../../../../shared/services/storage.service';

@Component({
  selector: 'limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.scss']
})
export class LimitsComponent implements OnInit {
  public limitData: any;
  public emptyLimit = null;

  constructor(
    private walletService: WalletService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const walletNo = this.storageService.getData('wallet_no');

    this.walletService.getCustomerLimit(walletNo).subscribe(data => {
      this.limitData = data;
      this.emptyLimit = !this.limitData.length ? true : false;
    });
  }
}
