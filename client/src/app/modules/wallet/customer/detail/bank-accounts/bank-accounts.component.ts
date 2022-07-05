import { Component, OnInit } from '@angular/core';
import { WalletService } from '@app/core/http';
import { StorageService } from '../../../../../shared/services/storage.service';

@Component({
  selector: 'bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss']
})
export class BankAccountsComponent implements OnInit {
  public bankData: any;
  public emptyBank = null;

  constructor(
    private walletService: WalletService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const walletNo = this.storageService.getData('wallet_no');

    this.walletService.getCustomerBank(walletNo).subscribe(data => {
      this.bankData = data;
      this.emptyBank = !this.bankData.length ? true : false;
    });
  }
}
