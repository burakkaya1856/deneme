import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fee-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class FeeDetailsComponent implements OnInit {
  public fee;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
