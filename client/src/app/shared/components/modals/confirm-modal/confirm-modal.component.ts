import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public title: any;
  public subtitle: any;
  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  confirm() {
    this.event.emit({ data: true });
    this.closeModal();
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
