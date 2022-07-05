import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'bank-account',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddBankAccountComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public banks;
  public statusKeys: any;
  public enumData;
  public bankPermission = true;
  public account = {
    bank_id: '',
    bank_holder: '',
    iban: '',
    branch_code: '',
    branch_name: '',
    account_number: '',
    status: 'active'
  };

  constructor(
    private bsModalRef: BsModalRef,
    private settingsService: SettingsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.settingsService.getBanks().subscribe(
      banks => {
        this.banks = banks.items;
        this.account.bank_id = this.banks[0].id;
      },
      err => {
        this.bankPermission = err.status == 403 ? false : true;
        const errorMessage = err.error.error_message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );

    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status).filter(key => {
          return key != 'deleted';
        });
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.settingsService.createBankAccount(this.account).subscribe(res => {
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
