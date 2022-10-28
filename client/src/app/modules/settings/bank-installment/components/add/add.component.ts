import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add-bank',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddBankInstallmentComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public imageType = '';
  public statusKeys: any;
  public posBankList = [];
  public enumData;
  public bankName = null;
  public bankId: number;
  public bankInstallment = {
    bank_id: null,
    installment_name: '',
    bank_installment_count: null,
    bank_commission: null,
    description: '',
    status: 'active'
  };

  constructor(private bsModalRef: BsModalRef, private alertService: AlertService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status).filter(key => {
          return key != 'deleted';
        });
      }
    });

    let requestData = {
      search: '',
      status: '',
      page: 1,
      size: 100
    };

    this.settingsService.posBankList(requestData).subscribe((data: any) => {
      this.posBankList = data.items;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.bankInstallment.bank_id) {
      this.settingsService.addBankInstallment(this.bankInstallment).subscribe(res => {
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(res.message, 'success', false);
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  changeBank($event: any) {
    this.bankInstallment.bank_id = $event;
  }
}
