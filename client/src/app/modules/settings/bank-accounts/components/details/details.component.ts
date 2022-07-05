import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'bank-account-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class BankAccoundDetailsModalComponent implements OnInit {
  public bankAccount;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
