import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WalletService } from '@app/core/http';
import { AlertService } from '@app/shared/services/alert.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'remove-balance',
  templateUrl: './remove-balance.component.html',
  styleUrls: ['./remove-balance.component.scss']
})
export class DashboardRemoveBalance implements OnInit {
  public formSubmmitted = false;
  public walletNo;
  public removeBalance = {
    amount: null,
    comment: '',
    currency: ''
  };
  constructor(
    public bsModalRef: BsModalRef,
    private walletService: WalletService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.formSubmmitted = true;

    let requestData = {
      amount: this.removeBalance.amount,
      currency: this.removeBalance.currency,
      description: this.removeBalance.comment
    };

    if (form.valid) {
      this.walletService
        .removeManulBalance(requestData, this.walletNo)
        .subscribe(data => {
          this.alertService.setNoticeHandler(data.message, 'success', false);
        });

      this.formSubmmitted = false;
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
