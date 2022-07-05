import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'ven-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent implements OnInit, OnDestroy {

  onClose: Subject<boolean>;
  isConfirmed = false;
  title: string;
  content: string;
  confirmButton: string;
  declineButton:  string;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }
  confirm() {
    this.isConfirmed = true;
    this.bsModalRef.hide();
  }
  decline() {
    this.isConfirmed = false;
    this.bsModalRef.hide();
  }

  ngOnDestroy() {
    this.onClose.next(this.isConfirmed);
    this.bsModalRef.hide();
  }
}
