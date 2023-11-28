import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService, SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-merchant-bank-add',
  templateUrl: './merchant-bank-add.component.html',
  styleUrls: ['./merchant-bank-add.component.scss']
})
export class MerchantBankAddComponent implements OnInit {
  merchantBankForm!: FormGroup;
  submitted = false;
  merchantList: any;
  bankList: any;
  installmentList: any;
  enumData: any;
  statusKeys: any;
  merchantPosBankInstallment: any;

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private settingService: SettingsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (this.merchantPosBankInstallment) {
      this.merchantBankForm = this.formBuilder.group({
        id: this.merchantPosBankInstallment.id,
        installment_name: this.merchantPosBankInstallment.installment_name,
        merchant_id: [this.merchantPosBankInstallment.merchant_id, Validators.required],
        bank_id: [this.merchantPosBankInstallment.pos_bank_id, [Validators.required]],
        merchant_installment_count: [this.merchantPosBankInstallment.merchant_installment_count, Validators.required],
        bank_commission: [this.merchantPosBankInstallment.bank_commission, Validators.required],
        debit_commission: [this.merchantPosBankInstallment.debit_commission, Validators.required],
        credit_commission: [this.merchantPosBankInstallment.credit_commission, Validators.required],
        prepaid_commission: [this.merchantPosBankInstallment.prepaid_commission, Validators.required],
        normal_min_limit: [this.merchantPosBankInstallment.normal_min_limit, Validators.required],
        normal_max_limit: [this.merchantPosBankInstallment.normal_max_limit, Validators.required],
        treed_min_limit: [this.merchantPosBankInstallment.treed_min_limit, Validators.required],
        treed_max_limit: [this.merchantPosBankInstallment.treed_max_limit, Validators.required],
        status: [this.merchantPosBankInstallment.status, Validators.required]
      });

      this.selectBank(this.merchantPosBankInstallment.pos_bank_id);
    } else {
      this.merchantBankForm = this.formBuilder.group({
        installment_name: '',
        merchant_id: ['', Validators.required],
        bank_id: ['', [Validators.required]],
        merchant_installment_count: ['', Validators.required],
        bank_commission: ['', Validators.required],
        prepaid_commission: ['', Validators.required],
        debit_commission: ['', Validators.required],
        credit_commission: ['', Validators.required],
        normal_min_limit: ['', Validators.required],
        normal_max_limit: ['', Validators.required],
        treed_min_limit: ['', Validators.required],
        treed_max_limit: ['', Validators.required],
        status: ['', Validators.required]
      });
    }
    this.getMerchantList();
    this.getPosBankList();

    this.settingService.enumSub.subscribe(data => {
      if (data && data.length > 0) {
        this.enumData = data;

        this.enumData.forEach(item => {
          if (item.Status) {
            this.statusKeys = Object.keys(item.Status).filter(f => f != 'deleted');
          }
        });
      }
    });
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  get f() {
    return this.merchantBankForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.merchantBankForm.invalid) return;

    if (this.merchantBankForm.value.id) {
      this.merchantService.editMerchantPosBank(this.merchantBankForm.value).subscribe((res: any) => {
        this.alertService.setNoticeHandler(res.message, 'success', false);
        this.closeModal();
      });
    } else {
      this.merchantService.addMerchantPosBank(this.merchantBankForm.value).subscribe((res: any) => {
        this.alertService.setNoticeHandler(res.message, 'success', false);
        this.closeModal();
      });
    }

    this.submitted = false;
  }

  selectBank(e: any) {
    this.settingService.getPosBankDetails(e).subscribe(res => (this.installmentList = res.bank_installment));
  }

  getMerchantList() {
    this.merchantService.getMerchantList().subscribe((res: any) => (this.merchantList = res.items));
  }

  getPosBankList() {
    let requestData = {
      search: '',
      status: '',
      page: 1,
      size: 100
    };
    this.settingService.posBankList(requestData).subscribe(res => (this.bankList = res.items));
  }
}
