import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService, SettingsService } from '@app/core/http';
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

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private settingService: SettingsService
  ) {
    this.merchantBankForm = this.formBuilder.group({
      merchant_id: ['', Validators.required],
      bank_id: ['', [Validators.required]],
      installmant_count: ['', [Validators.required]],
      bank_installment_count: ['', Validators.required],
      bank_commission: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getMerchantList();
    this.getPosBankList();
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
