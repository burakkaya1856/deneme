import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'permission-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [TitleCasePipe]
})
export class UpdateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public enumData;
  public permissionData: any;
  public statusKeys: any;

  constructor(
    private bsModalRef: BsModalRef,
    private panelService: PanelService,
    private alertService: AlertService,
    public titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.permissionData.description = this.titleCasePipe.transform(
      this.permissionData.description
    );
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let requestData = {
        permission_type: this.permissionData.permission_type,
        description: this.permissionData.description,
        status: this.permissionData.status
      };

      this.panelService
        .panelPermissionUpdate(this.permissionData.id, requestData)
        .subscribe(res => {
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
