import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'level-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class LevelDetailsComponent implements OnInit {
  public level: any;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
