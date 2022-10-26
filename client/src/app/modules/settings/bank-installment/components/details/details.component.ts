import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'bank-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class BankInstallmentDetailsComponent implements OnInit {
  public bank;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
