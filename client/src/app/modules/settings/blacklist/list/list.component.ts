import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AddBlacklistComponent } from '../components/add/add.component';
import { BlacklistDetailsComponent } from '../components/details/details.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { UpdateBlacklistComponent } from '../components/update/update.component';

@Component({
  selector: 'blacklist-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BlackListListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public blacklists = [];
  public emptyList = null;
  public enumData: any;
  public statusKeys: any;
  public pagination = {
    total: null,
    size: null,
    page: null
  };
  public maxPage = 5;
  public searchData = '';
  public selectedStatus = null;
  public paginationCount = 10;
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };
  public isLoaded = false;

  constructor(
    public bsModalService: BsModalService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    const blacklistParams = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };
    this.settingsService.getBlacklist(blacklistParams).subscribe(blacklist => {
      this.blacklists = blacklist.items;
      this.isLoaded = true;
      this.pagination = {
        total: blacklist.total,
        size: blacklist.size,
        page: blacklist.page + 1
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyList = !this.blacklists.length ? true : false;
    });

    this.settingsService.enumSub.subscribe(data => {
      if (data && data.length > 0) {
        this.enumData = data;

        this.enumData.forEach(item => {
          if (item.Status) {
            this.statusKeys = Object.keys(item.Status);
          }
        });
      }
    });
  }

  blacklistDetails(id: any): void {
    this.settingsService.getBlacklistDetails(id).subscribe(blacklist => {
      this.bsModalRef = this.bsModalService.show(BlacklistDetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          blacklist
        }
      });
    });
  }

  updateBlacklist(blacklist): void {
    let blacklistData = JSON.parse(JSON.stringify(blacklist));

    this.bsModalRef = this.bsModalService.show(UpdateBlacklistComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        blacklistData,
        enumData: this.enumData
      }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };

      this.settingsService.getBlacklist(requestData).subscribe(accounts => {
        this.blacklists = accounts.items;
      });
    });
  }

  deleteBlacklist(blacklist): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.blacklist.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant(
        'settings.blacklist.list.delete.title'
      )
    };

    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: initialState
    });
    this.bsModalRef.content.event.subscribe(data => {
      const requestData = {
        search: this.searchData,
        status: this.selectedStatus || '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.settingsService.deleteBlacklist(blacklist.id).subscribe(res => {
        this.getBlacklist(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addBlacklist(): void {
    this.bsModalRef = this.bsModalService.show(AddBlacklistComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData
      }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let blacklistParams = {
        search: '',
        status: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.settingsService.getBlacklist(blacklistParams).subscribe(banks => {
        this.blacklists = banks.items;

        this.pagination = {
          total: banks.total,
          size: banks.size,
          page: banks.page + 1
        };
        this.pageInfo = {
          total: this.pagination.total,
          start: this.pagination.size * (this.pagination.page - 1),
          end: this.pagination.size * this.pagination.page
        };
      });
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: event.page - 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page + 1;
    this.getBlacklist(requestData);
  }

  searchBlacklist(event: string): void {
    this.searchData = event.trim();

    const requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getBlacklist(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page + 1;
    this.getBlacklist(requestData);
  }

  paginationCountChange(count: number): void {
    const requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getBlacklist(requestData);
  }

  getBlacklist(blacklistParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getBlacklist(blacklistParams).subscribe(data => {
      this.blacklists = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.pageInfo = {
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
