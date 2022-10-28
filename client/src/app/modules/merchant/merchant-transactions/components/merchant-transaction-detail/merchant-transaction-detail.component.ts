import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-merchant-transaction-detail',
  templateUrl: './merchant-transaction-detail.component.html',
  styleUrls: ['./merchant-transaction-detail.component.scss']
})
export class MerchantTransactionDetailComponent implements OnInit {
  transaction!: any;
  showTransaction = false;
  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
