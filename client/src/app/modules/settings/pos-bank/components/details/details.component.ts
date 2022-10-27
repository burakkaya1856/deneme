import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'pos-bank-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class PosBankDetailComponent implements OnInit {
  public posBank: any;
  public showInstallment: boolean = false;
  public showMerchant: boolean = false;
  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
