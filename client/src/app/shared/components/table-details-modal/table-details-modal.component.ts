import { Component, OnInit } from '@angular/core';
import { WalletService } from '@app/core/http/wallet/wallet.service';
import { AlertService } from '@app/shared/services/alert.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'details-modal',
  templateUrl: './table-details-modal.component.html',
  styleUrls: ['./table-details-modal.component.scss']
})
export class TableDetailsModalComponent implements OnInit {
  public transactionData;
  public sendTransactionEmail;

  constructor(
    public bsModalRef: BsModalRef,
    private walletService: WalletService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  handerSendReceipt() {
    this.walletService
      .sendTransactionEmail(this.transactionData.transaction.transaction_id)
      .subscribe(data => {
        this.alertService.setNoticeHandler(data.message, 'success');
      });
  }
}
