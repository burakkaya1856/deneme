import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'role-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  public tabTitleState = false;
  public justified = true;
  public modifiedPermissions;
  public permissionList;
  public userPermissions;
  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.permissionList.forEach((itemPanelPermission: any) => {
      if (
        this.userPermissions.some(
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

    if (window.innerWidth <= 620) {
      this.tabTitleState = true;
      this.justified = false;
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
