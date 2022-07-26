import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'user-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [TitleCasePipe]
})
export class UpdateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public permissionList: any;
  public modifiedPermissions = [];
  public roleId = '';
  public tabTitleState = false;
  public justified = true;
  public userData: any;
  public userRoles: any;
  public enumData;
  public statusKeys: any;
  public permissionStates = {
    roles: true,
    permissions: true
  };

  constructor(
    private bsModalRef: BsModalRef,
    private panelService: PanelService,
    private alertService: AlertService,
    public titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.panelService.panelPermissions().subscribe(
      data => {
        this.permissionList = data;

        this.permissionList.filter((itemPanelPermission: any) => {
          if (
            this.userData.permissions.some(
              (item: any) => item.id == itemPanelPermission.id
            )
          ) {
            itemPanelPermission.state = true;
          } else {
            itemPanelPermission.state = false;
          }
        });

        this.modifiedPermissions = this.permissionList.sort((a, b) => {
          return a.id - b.id;
        });
      },
      err => {
        this.permissionStates.permissions = err.status == 403 ? false : true;
        const errorMessage = err.error.error_message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );

    this.userData.name = this.titleCasePipe.transform(this.userData.name);
    this.userData.surname = this.titleCasePipe.transform(this.userData.surname);

    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      }
    });
    let requestData = {
      search: '',
      page: 1,
      size: 100
    };
    this.panelService.panelRoles(requestData).subscribe(
      data => {
        this.userRoles = data.items;
        let role = this.userRoles.find(item => item.name == this.userData.role);
        this.roleId = role.id;
        this.userData.role = this.titleCasePipe.transform(this.userData.role);
      },
      err => {
        this.permissionStates.roles = err.status == 403 ? false : true;
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
        name: this.userData.name,
        surname: this.userData.surname,
        email: this.userData.email,
        role_id: this.roleId.toString(),
        permissions_ids: permissionIds,
        status: this.userData.status
      };

      this.panelService
        .panelUserUpdate(this.userData.id, requestData)
        .subscribe(res => {
          this.event.emit({ data: true });
          this.alertService.setNoticeHandler(res.message, 'success', true);
        });
      this.closeModal();
    }
  }

  changeUserRole(event: any) {
    this.roleId = event.id;
    this.modifiedPermissions = [];
    let permissionTypes = event.permissions;

    this.permissionList.forEach((itemPanelPermission: any) => {
      if (
        permissionTypes.some((item: any) => item.id == itemPanelPermission.id)
      ) {
        itemPanelPermission.state = true;
      } else {
        itemPanelPermission.state = false;
      }
    });

    this.modifiedPermissions = this.permissionList.sort((a, b) => {
      return a.id - b.id;
    });
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
