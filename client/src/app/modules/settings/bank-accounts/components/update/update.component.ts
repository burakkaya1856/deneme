import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'bank-account-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class BankAccountUpdateModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public bankAccountData;
  public banks;
  public statusKeys: any;
  public enumData;
  public bankPermission = true;

  constructor(
    public bsModalRef: BsModalRef,
    private settingsService: SettingsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.settingsService.getBanks().subscribe(
      banks => {
        this.banks = banks.items;

        this.banks.forEach(bank => {
          if (bank.name === this.bankAccountData.bank_name) {
            this.bankAccountData.bank_id = bank.id;
          }
        });
      },
      err => {
        this.bankPermission = err.status == 403 ? false : true;
        const errorMessage = err.error.error_message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );

    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.bankAccountData.bank_id) {
      let requestData = {
        bank_id: this.bankAccountData.bank_id,
        bank_holder: this.bankAccountData.bank_holder,
        iban: this.bankAccountData.iban,
        branch_code: this.bankAccountData.branch_code,
        branch_name: this.bankAccountData.branch_name,
        account_number: this.bankAccountData.account_number,
        status: this.bankAccountData.status
      };

      this.settingsService
        .updateBankAccount(this.bankAccountData.id, requestData)
        .subscribe(res => {
          this.event.emit({ data: true });
          this.alertService.setNoticeHandler(res.message, 'success', false);
        });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
