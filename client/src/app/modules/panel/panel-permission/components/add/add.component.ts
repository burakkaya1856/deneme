import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'permission-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public enumData;
  public statusKeys: any;
  public permission = {
    type: '',
    description: '',
    status: 'active'
  };
  constructor(
    private bsModalRef: BsModalRef,
    private panelService: PanelService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status).filter(key => {
          return key != 'deleted';
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let requestData = {
        permission_type: this.permission.type,
        description: this.permission.description,
        status: this.permission.status
      };

      this.panelService.panelPermissionCreate(requestData).subscribe(res => {
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
