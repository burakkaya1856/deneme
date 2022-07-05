import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],

})
export class DeleteModalComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public title:any;
  public subtitle:any;
  constructor( private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

delete(){
  this.event.emit({data: true});
  this.closeModal();
}

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
