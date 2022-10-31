import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-merchant-bank-detail',
  templateUrl: './merchant-bank-detail.component.html',
  styleUrls: ['./merchant-bank-detail.component.scss']
})
export class MerchantBankDetailComponent implements OnInit {
  merchantPosBankInstallment: any;
  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
