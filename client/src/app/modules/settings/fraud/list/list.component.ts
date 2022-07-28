import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FraudDetailsComponent } from '../components/details/details.component';
import { UpdateFraudComponent } from '../components/update/update.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fraud-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FraudListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public fraudList = [];
  public currentPage = null;
  public emptyFraud = null;
  public deleteModal = false;
  public enumData: any;
  public statusKeys: any;
  public deleteModalData: any;
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
    let requestData = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };
    this.settingsService.getFrauds(requestData).subscribe(frauds => {
      this.fraudList = frauds.items;
      this.isLoaded = true;

      this.pagination = {
        total: frauds.total,
        size: frauds.size,
        page: frauds.page
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyFraud = !this.fraudList.length ? true : false;
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

  fraudDetails(id: any): void {
    this.settingsService.getBankDetails(id).subscribe(fraud => {
      this.bsModalRef = this.bsModalService.show(FraudDetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: { fraud }
      });
    });
  }

  updateFraud(fraud): void {
    let fraudData = JSON.parse(JSON.stringify(fraud));
    this.bsModalRef = this.bsModalService.show(UpdateFraudComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        fraudData,
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: this.pagination.page,
        size: this.paginationCount
      };

      this.settingsService.getBanks(requestData).subscribe(frauds => {
        this.fraudList = frauds.items;
      });
    });
  }

  deleteFraud(fraud): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.fraud.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant('settings.fraud.list.delete.title')
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
    this.getFrauds(requestData);
  }

  searchFraud(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getFrauds(requestData);
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
    this.getFrauds(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page ;
    this.getFrauds(requestData);
  }

  getFrauds(fraudParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getFrauds(fraudParams).subscribe(data => {
      this.fraudList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  statusChangeHandler(event: any) {
    this.selectedStatus = event;
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getFrauds(requestData);
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
