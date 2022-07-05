import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'campaign-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CampaignDetailsComponent {
  public campaign;

  constructor(private bsModalRef: BsModalRef) {}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
