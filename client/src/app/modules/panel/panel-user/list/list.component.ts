import { Component, OnInit } from '@angular/core';
//services
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '@app/core/http';
import { PanelService } from '../../../../core/http/panel/panel.service';
//components
import { DetailsComponent } from '../components/details/details.component';
import { UpdateComponent } from '../components/update/update.component';
import { PermissionsComponent } from '../components/permissions/permissions.component';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public panelUserList = [];
  public bsModalRef: BsModalRef;
  public modifiedPermissions = [];
  public panelPermission: any;
  public enumData: any;
  public emptyUser = null;
  public searchData: any = '';
  public paginationCount = 10;
  public isLoaded = false;
  public params = {
    q: '',
    page: 0,
    size: 10
  };
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
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.pagination.maxPage = 3;
    }
    let requestData = {
      q: '',
      page: 0,
      size: 10
    };
    this.panelService.getPanelUsers(requestData).subscribe(data => {
      this.panelUserList = data.items;

      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pagination.page = data.page + 1;

      this.info = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };

      if (this.panelUserList.length == 0) {
        this.emptyUser = true;
      } else {
        this.emptyUser = false;
        this.settingsService.enumSub.subscribe(data => {
          this.enumData = data;
        });
      }
    });
  }

  detailUser(user) {
    this.panelService.panelUserDetail(user.id).subscribe(userDetail => {
      this.bsModalRef = this.bsModalService.show(DetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          userDetail
        }
      });
    });
  }

  permissionUser(userPermissions): void {
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

  updateUser(user): void {
    let userData = JSON.parse(JSON.stringify(user));

    this.bsModalRef = this.bsModalService.show(UpdateComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        userData,
        enumData: this.enumData
      }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let paramsData = {
        q: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.getPanelUser(paramsData);
    });
  }

  paginationPageChangedHandler(event: any) {
    let paramsData = {
      q: this.searchData,
      page: event.page - 1,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page + 1;
    this.getPanelUser(paramsData);
  }

  searchHandler(event: any) {
    this.searchData = event.trim();

    let paramsData = {
      q: this.searchData,
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page + 1;
    this.getPanelUser(paramsData);
  }

  paginationCountHandler(event: any) {
    this.paginationCount = event;

    let paramsData = {
      q: this.searchData,
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page + 1;
    this.getPanelUser(paramsData);
  }

  getPanelUser(data: any) {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.panelService.getPanelUsers(data).subscribe(data => {
      this.panelUserList = data.items;
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
