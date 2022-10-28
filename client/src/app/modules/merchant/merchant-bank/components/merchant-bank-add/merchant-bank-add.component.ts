import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private bsModalRef: BsModalRef, private formBuilder: FormBuilder) {
    this.merchantBankForm = this.formBuilder.group({
      merchant_id: ['', Validators.required],
      bank_id: ['', [Validators.required]],
      installmant_count: ['', [Validators.required]],
      fee: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // TODO : bayi listesi dropdown için çekilecek
    this.merchantList = [
      { id: 1, value: 'Bayi 1' },
      { id: 2, value: 'Bayi 2' },
      { id: 3, value: 'Bayi 3' },
      { id: 4, value: 'Bayi 4' }
    ];

    this.bankList = [
      {
        id: 1,
        value: 'Bank 1'
      },
      {
        id: 2,
        value: 'Bank 2'
      },
      {
        id: 3,
        value: 'Bank 3'
      }
    ];
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
    console.log(e);
  }
}
