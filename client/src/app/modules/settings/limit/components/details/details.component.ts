import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-limit',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class LimitDetailsComponent implements OnInit {
  public limit;
  public selectCurrency = 'TRY';

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
