import { Component, OnInit } from '@angular/core';
import { PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'role-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public roleDetail;
  public tabTitleState = false;
  public justified = true;
  public modifiedPermissions;
  public permissionStates = {
    permissions: true
  };

  constructor(
    private bsModalRef: BsModalRef,
    private panelService: PanelService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    let permissionList: any;

    this.panelService.panelPermissions().subscribe(
      data => {
        permissionList = data;

        permissionList.filter((itemPanelPermission: any) => {
          if (
            this.roleDetail.permissions.some(
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
        if (err.status == 403) this.permissionStates.permissions = false;
        const errorMessage = err.error.error_message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );

    if (window.innerWidth <= 620) {
      this.tabTitleState = true;
      this.justified = false;
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
