import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'role-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [TitleCasePipe]
})
export class UpdateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public modifiedPermissions;
  public tabTitleState = false;
  public justified = true;
  public roleData: any;
  public permissionState = true;

  constructor(
    private bsModalRef: BsModalRef,
    private panelService: PanelService,
    private alertService: AlertService,
    public titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    let permissionList;
    this.panelService.panelPermissions().subscribe(
      data => {
        permissionList = data;

        permissionList.filter((itemPanelPermission: any) => {
          if (
            this.roleData.permissions.some(
              (item: any) => item.id == itemPanelPermission.id
            )
          ) {
            itemPanelPermission.state = true;
          } else {
            itemPanelPermission.state = false;
          }
        });

        this.modifiedPermissions = permissionList.sort((a, b) => {
          return a.id - b.id;
        });
      },
      err => {
        this.permissionState = err.status == 403 ? false : true;
        const errorMessage = err.error.error_message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );
    this.roleData.name = this.titleCasePipe.transform(this.roleData.name);
    this.roleData.code = this.titleCasePipe.transform(this.roleData.code);

    if (window.innerWidth <= 620) {
      this.tabTitleState = true;
      this.justified = false;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let permissionIds = [];

      this.modifiedPermissions.forEach((item: any) => {
        if (item.state == true) {
          permissionIds.push(item.id);
        }
      });

      let requestData = {
        name: this.roleData.name,
        code: this.roleData.code,
        permissions_ids: permissionIds
      };

      this.panelService
        .panelRoleUpdate(this.roleData.id, requestData)
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
