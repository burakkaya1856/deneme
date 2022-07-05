import { Component, OnInit } from '@angular/core';
//services
import { PanelService, SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//components
import { AddComponent } from '../components/add/add.component';
import { DetailsComponent } from '../components/details/details.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { UpdateComponent } from '../components/update/update.component';
import { UsersComponent } from '../components/users/users.component';

@Component({
  selector: 'permission-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public emptyTransaction = null;
  public isLoaded = false;
  public panelPermissions: any;
  public enumData;
  public emptyPermission = null;
  constructor(
    private panelService: PanelService,
    private bsModalService: BsModalService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.panelService.panelPermissions().subscribe(data => {
      this.panelPermissions = data;
      this.isLoaded = true;
      this.emptyPermission = !this.panelPermissions.length ? true : false;

      this.settingsService.enumSub.subscribe(data => {
        this.enumData = data;
      });
    });
  }

  addPermission() {
    this.bsModalRef = this.bsModalService.show(AddComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData
      }
    });

    this.bsModalRef.content.event.subscribe(data => {
      this.getPanelPermissions();
    });
  }

  updatePermission(permission) {
    let permissionData = JSON.parse(JSON.stringify(permission));
    this.bsModalRef = this.bsModalService.show(UpdateComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        permissionData,
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      this.getPanelPermissions();
    });
  }

  detailsPermission(permission) {
    this.panelService
      .panelPermissionDetail(permission.id)
      .subscribe(permissionDetail => {
        this.bsModalRef = this.bsModalService.show(DetailsComponent, {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            permissionDetail
          }
        });
      });
  }

  userPermission(permission) {
    this.panelService.panelPermissionUsers(permission.id).subscribe(users => {
      this.bsModalRef = this.bsModalService.show(UsersComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          users,
          permission
        }
      });
    });
  }

  deletePermission(id: number): void {
    const initialState = {
      title: this.translateService.instant(
        'panel.panelPermission.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant(
        'panel.panelPermission.list.delete.title'
      )
    };

    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: initialState
    });
    this.bsModalRef.content.event.subscribe(data => {
      this.panelService.panelPermissionDelete(id.toString()).subscribe(res => {
        this.getPanelPermissions();
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  getPanelPermissions() {
    this.panelService.panelPermissions().subscribe(data => {
      this.panelPermissions = data;
    });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
