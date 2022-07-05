import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WalletService } from '@app/core/http';
import { AlertService } from '@app/shared/services/alert.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.scss']
})
export class DashboardAddBalance implements OnInit {
  public formSubmmitted = false;
  public walletNo;
  public addBalance = {
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
      amount: this.addBalance.amount,
      currency: this.addBalance.currency,
      description: this.addBalance.comment
    };

    if (form.valid) {
      this.walletService
        .addManulBalance(requestData, this.walletNo)
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
