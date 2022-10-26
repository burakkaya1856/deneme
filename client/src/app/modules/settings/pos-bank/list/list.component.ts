import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { DeleteModalComponent } from '@app/shared/components/modals/delete-modal/delete-modal.component';
import { AlertService } from '@app/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AddPosBankComponent } from '../components/add/add.component';
import { PosBankDetailComponent } from '../components/details/details.component';
import { UpdateBankPosComponent } from '../components/update/update.component';
@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PosBankListComponent implements OnInit, OnDestroy {
  public bsModalRef: BsModalRef;
  public posBankList = [];
  public emptyList = null;
  public isLoaded = false;
  public maxPage = 5;
  public searchData = '';
  public selectedStatus = null;
  public enumData: any;
  public statusKeys: any;
  public paginationCount = 10;
  public pagination = {
    total: null,
    size: null,
    page: null
  };
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };

  constructor(
    private settingsService: SettingsService,
    public bsModalService: BsModalService,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
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
    let requestData = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };

    this.settingsService.posBankList(requestData).subscribe((data: any) => {
      this.posBankList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * this.pagination.page,
        end: this.pagination.size * this.pagination.page
      };
      this.emptyList = !this.posBankList.length ? true : false;
    });
  }

  getPosBanks(requestData?: any) {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);
    this.settingsService.posBankList(requestData).subscribe((data: any) => {
      this.posBankList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * this.pagination.page,
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  searchPosBank(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getPosBanks(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getPosBanks(requestData);
  }

  posBankDetail(id: any): void {
    this.settingsService.getPosBankDetails(id).subscribe(posBank => {
      this.bsModalRef = this.bsModalService.show(PosBankDetailComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: { posBank }
      });
    });
  }

  updatePosBank(posBank: any): void {
    let posBankData = JSON.parse(JSON.stringify(posBank));

    this.bsModalRef = this.bsModalService.show(UpdateBankPosComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: { posBankData }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: this.selectedStatus || '',
        page: this.pagination.page,
        size: this.paginationCount
      };

      this.settingsService.posBankList(requestData).subscribe((data: any) => {
        this.posBankList = data.items;
      });
    });
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: event.page,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getPosBanks(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getPosBanks(requestData);
  }

  addPosBank(): void {
    this.bsModalRef = this.bsModalService.show(AddPosBankComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: this.searchData,
        status: '',
        page: 1,
        size: this.paginationCount
      };

      this.pagination.page = requestData.page;
      this.getPosBanks(requestData);
    });
  }

  deletePosBank(posBank): void {
    const initialState = {
      title: this.translateService.instant('settings.posBank.list.delete.headerTitle'),
      subtitle: this.translateService.instant('settings.posBank.list.delete.title')
    };

    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: initialState
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: this.searchData,
        status: this.selectedStatus || '',
        page: this.pagination.page,
        size: this.paginationCount
      };

      this.settingsService.deletePosBank(posBank.id).subscribe(res => {
        this.getPosBanks(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
