import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'role-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public modifiedPermissions;
  public justified = true;
  public tabTitleState = false;
  public permissionState = true;
  public userRole = {
    name: null,
    code: null
  };
  constructor(
    private bsModalRef: BsModalRef,
    private panelService: PanelService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    let permissionList;
    this.panelService.panelPermissions().subscribe(
      data => {
        permissionList = data;

        permissionList.forEach((itemPanelPermission: any) => {
          itemPanelPermission.state = false;
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
        name: this.userRole.name,
        code: this.userRole.code,
        permissions_ids: permissionIds
      };

      this.panelService.panelRoleCreate(requestData).subscribe(res => {
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
