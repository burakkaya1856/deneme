import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { PanelService } from '../../../../core/http/panel/panel.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public formSubmitted = false;
  public permissionList: any;
  public userRoles: any;
  public modifiedPermissions = [];
  public justified = true;
  public tabTitleState = false;
  public permissionStates = {
    roles: true,
    permissions: true
  };
  public user = {
    name: '',
    surname: '',
    email: '',
    role: null,
    roleId: null
  };

  constructor(
    private panelService: PanelService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 620) {
      this.tabTitleState = true;
      this.justified = false;
    }
    let requestData = {
      search: '',
      page: 0,
      size: 100
    };
    this.panelService.panelRoles(requestData).subscribe(
      data => {
        this.userRoles = data.items;
      },
      err => {
        this.permissionStates.roles = err.status == 403 ? false : true;
        const errorMessage = err.error.error_message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      let permissionIds = [];

      this.modifiedPermissions.forEach((item: any) => {
        if (item.state == true) {
          permissionIds.push(item.id);
        }
      });

      let requestData = {
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        role_id: this.user.roleId.toString(),
        permissions_ids: permissionIds
      };

      this.panelService.panelUserPreRegister(requestData).subscribe(res => {
        this.alertService.setNoticeHandler(res.message, 'success', true);
        this.router.navigate(['/panel/panel-user/list']);
      });

      this.formSubmitted = false;
    }
  }

  changeUserRole(event: any) {
    this.user.roleId = event.id;
    this.modifiedPermissions = [];
    let permissionTypes = event.permissions;

    if (!this.permissionList) {
      this.panelService.panelPermissions().subscribe(
        data => {
          this.permissionList = data;
          this.permissionList.forEach((itemPanelPermission: any) => {
            if (
              permissionTypes.some(
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
          const errorMessage =
            err.error.error_message || err.error.detail[0].msg;
          this.alertService.setNoticeHandler(errorMessage, 'warning', true);
        }
      );
    } else {
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
  }
}
