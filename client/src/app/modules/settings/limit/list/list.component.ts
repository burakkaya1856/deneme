import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AddLimitComponent } from '../components/add/add.component';
import { LimitDetailsComponent } from '../components/details/details.component';
import { UpdateLimitComponent } from '../components/update/update.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'limit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class LimitListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public limitList = [];
  public emptyList = null;
  public selectCurrency = 'TRY';
  public isLoaded = false;
  public maxPage = 5;
  public searchData = '';
  public selectedStatus = null;
  public transactionKeys;
  public enumData: any;
  public selectedTransactionType = null;
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
    public bsModalService: BsModalService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    let limitParams = {
      transaction_type: this.selectedTransactionType || '',
      status: '',
      page: 0,
      size: this.paginationCount
    };
    this.settingsService.getLimitList(limitParams).subscribe(limits => {
      this.limitList = limits.items;
      this.isLoaded = true;
      this.pagination = {
        total: limits.total,
        size: limits.size,
        page: limits.page + 1
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyList = !this.limitList.length ? true : false;
    });
    this.settingsService.enumSub.subscribe(data => {
      this.enumData = data;
      if (this.enumData && this.enumData.length > 0) {
        this.enumData.forEach(item => {
          if (item.Status) {
            this.statusKeys = Object.keys(item.Status);
          } else if (item.TransactionType) {
            this.transactionKeys = Object.keys(item.TransactionType);
          }
        });
      }
    });
  }

  limitDetails(id: any): void {
    this.settingsService.getLimitDetails(id).subscribe(limit => {
      this.bsModalRef = this.bsModalService.show(LimitDetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: { limit }
      });
    });
  }

  updateLimit(limit): void {
    let limitData = JSON.parse(JSON.stringify(limit));
    this.bsModalRef = this.bsModalService.show(UpdateLimitComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        limitData,
        enumData: this.enumData
      }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        transaction_type: this.selectedTransactionType || '',
        status: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.settingsService.getLimitList(requestData).subscribe(limits => {
        this.limitList = limits.items;
      });
    });
  }

  deleteLimit(limit): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.limit.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant(
        'settings.limit.list.delete.title'
      )
    };

    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: initialState
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        transaction_type: this.selectedTransactionType || '',
        status: this.selectedStatus || '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };

      this.settingsService.deleteLimit(limit.id).subscribe(res => {
        this.getLimits(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addLimit(): void {
    this.bsModalRef = this.bsModalService.show(AddLimitComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        transaction_type: this.selectedTransactionType || '',
        status: '',
        page: 0,
        size: this.paginationCount
      };

      this.pagination.page = requestData.page + 1;
      this.getLimits(requestData);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      transaction_type: this.selectedTransactionType || '',
      status: this.selectedStatus || '',
      page: event.page - 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page + 1;
    this.getLimits(requestData);
  }

  searchLimit(event: string): void {
    let requestData = {
      transaction_type: this.selectedTransactionType || '',
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getLimits(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;

    let requestData = {
      transaction_type: this.selectedTransactionType || '',
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getLimits(requestData);
  }

  searchTransactionType(event: any): void {
    this.selectedTransactionType = event;

    let requestData = {
      transaction_type: this.selectedTransactionType || '',
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getLimits(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      transaction_type: this.selectedTransactionType || '',
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getLimits(requestData);
  }

  getLimits(limitParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getLimitList(limitParams).subscribe(data => {
      this.limitList = data.items;
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
