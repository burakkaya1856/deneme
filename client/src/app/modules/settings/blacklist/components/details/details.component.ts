import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'blacklist-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class BlacklistDetailsComponent implements OnInit {
  public blacklist;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
