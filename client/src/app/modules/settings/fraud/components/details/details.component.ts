import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fraud-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class FraudDetailsComponent implements OnInit {
  public fraud;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
