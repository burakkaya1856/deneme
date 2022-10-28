import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MerchantBankAddComponent } from '../components/merchant-bank-add/merchant-bank-add.component';

@Component({
  selector: 'app-merchant-bank-list',
  templateUrl: './merchant-bank-list.component.html',
  styleUrls: ['./merchant-bank-list.component.scss']
})
export class MerchantBankListComponent implements OnInit {
  bsModalRef: BsModalRef;
  constructor(private bsModalService: BsModalService) {}

  ngOnInit(): void {}

  addMerchantBank() {
    this.bsModalRef = this.bsModalService.show(MerchantBankAddComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {}
    });
  }
}
