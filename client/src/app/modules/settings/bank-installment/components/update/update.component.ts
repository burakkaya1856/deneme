import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-bank',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateBankInstallmentComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public id: '';
  public bankInstallmentData;
  public customer = null;
  public selectedFile: File = null;
  public enumData;
  public errorMessage = '';
  public imageType = '';
  public description: string = '';
  public statusKeys: any;
  public choseImg = true;
  public loadingState = false;

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      } else if (item.FileType) {
        this.imageType = Object.keys(item.FileType)[0];
      }
    });
  }

  onSubmit(form: NgForm): void {
    this.bankInstallmentData['description'] = this.description;

    const requestData = {
      bank_id: this.bankInstallmentData.pos_bank_id,
      installment_name: this.bankInstallmentData.installment_name,
      bank_installment_count: this.bankInstallmentData.bank_installment_count,
      bank_commission: this.bankInstallmentData.bank_commission,
      description: this.bankInstallmentData.description,
      status: this.bankInstallmentData.status
    };
    if (form.valid && !this.loadingState) {
      this.settingsService.updateBankInstallment(this.bankInstallmentData.id, requestData).subscribe(res => {
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
