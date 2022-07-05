import { OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export abstract class BaseComponent implements OnDestroy {
  bsModalService: BsModalService;
  bsModalRef: BsModalRef;

  ngOnDestroy() {
    const modalCount = this.bsModalService.getModalsCount();
    if (modalCount > 0) {
      this.bsModalService._hideModal(modalCount);
    }
  }
}
