import { Component, OnInit } from '@angular/core';
//services
import { PanelService } from '@app/core/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from '@app/shared/services';
import { TranslateService } from '@ngx-translate/core';
//components
import { PermissionsComponent } from '../components/permissions/permissions.component';
import { DetailsComponent } from '../components/details/details.component';
import { UpdateComponent } from '../components/update/update.component';
import { AddComponent } from '../components/add/add.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public panelRoleList: any;
  public bsModalRef: BsModalRef;
  public modifiedPermissions = [];
  public maxPage = 5;
  public searchData = '';
  public paginationCount = 10;
  public panelPermission: any;
  public emptyRole = null;
  public isLoaded = false;
  public pagination = {
    total: null,
    size: null,
    page: null,
    maxPage: 5
  };
  public info = {
    total: null,
    start: null,
    end: null
  };

  constructor(
    private panelService: PanelService,
    private bsModalService: BsModalService,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }

    let requestData = {
      search: '',
      page: 1,
      size: this.paginationCount
    };
    this.panelService.panelRoles(requestData).subscribe(data => {
      this.panelRoleList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pagination.page = data.page + 1;

      this.info = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };

      this.emptyRole = !this.panelRoleList.length ? true : false;
    });
  }

  rolePermission(userPermissions): void {
    this.panelService.panelPermissions().subscribe(permissionList => {
      this.bsModalRef = this.bsModalService.show(PermissionsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          permissionList,
          userPermissions
        }
      });
    });
  }

  detailRole(role) {
    this.panelService.panelRoleDetail(role.id).subscribe(roleDetail => {
      this.bsModalRef = this.bsModalService.show(DetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          roleDetail,
          modifiedPermissions: this.modifiedPermissions
        }
      });
    });
  }

  updateRole(role: any): void {
    let roleData = JSON.parse(JSON.stringify(role));

    this.bsModalRef = this.bsModalService.show(UpdateComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        roleData
      }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.getPanelRole(requestData);
    });
  }

  deleteRole(id): void {
    const initialState = {
      title: this.translateService.instant(
        'panel.panelRole.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant(
        'panel.panelRole.list.delete.title'
      )
    };

    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: initialState
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.panelService.panelRoleDelete(id).subscribe(res => {
        this.getPanelRole(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addRole(): void {
    this.bsModalRef = this.bsModalService.show(AddComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        modifiedPermissions: this.modifiedPermissions
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.getPanelRole(requestData);
    });
  }

  paginationPageChangedHandler(event: any) {
    let paramsData = {
      search: this.searchData,
      page: event.page - 1,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page + 1;
    this.getPanelRole(paramsData);
  }

  searchHandler(event: any) {
    this.searchData = event.trim();

    let paramsData = {
      search: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page + 1;
    this.getPanelRole(paramsData);
  }

  paginationCountHandler(event: any) {
    this.paginationCount = event;

    let paramsData = {
      search: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page + 1;
    this.getPanelRole(paramsData);
  }

  getPanelRole(paramsData: any) {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.panelService.panelRoles(paramsData).subscribe(data => {
      this.panelRoleList = data.items;

      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.info = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
