import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AddFeeComponent } from '../components/add/add.component';
import { FeeDetailsComponent } from '../components/details/details.component';
import { UpdateFeeComponent } from '../components/update/update.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fees-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FeesListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public feeList = [];
  public emptyList = null;
  public enumData: any;
  public statusKeys: any;
  public isLoaded = false;
  public maxPage = 5;
  public searchData = '';
  public selectedStatus = null;
  public paginationCount = 10;
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };
  public pagination = {
    total: null,
    size: null,
    page: null
  };

  constructor(
    public bsModalService: BsModalService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private translateService: TranslateService
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

    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    let feeParams = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };
    this.settingsService.getFeeList(feeParams).subscribe(fees => {
      this.feeList = fees.items;
      this.isLoaded = true;
      this.pagination = {
        total: fees.total,
        size: fees.size,
        page: fees.page + 1
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyList = !this.feeList.length ? true : false;
    });
  }

  feeDetails(id: any): void {
    this.settingsService.getFee(id).subscribe(fee => {
      this.bsModalRef = this.bsModalService.show(FeeDetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: { fee }
      });
    });
  }

  updateFee(fee): void {
    let feeData = JSON.parse(JSON.stringify(fee));
    this.bsModalRef = this.bsModalService.show(UpdateFeeComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        feeData,
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
      this.settingsService.getFeeList(requestData).subscribe(fees => {
        this.feeList = fees.items;
      });
    });
  }

  deleteFee(fee): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.fees.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant('settings.fees.list.delete.title')
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
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.settingsService.deleteFee(fee.id).subscribe(res => {
        this.getFees(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addFee(): void {
    this.bsModalRef = this.bsModalService.show(AddFeeComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData
      }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: 1,
        size: this.paginationCount
      };
      this.getFees(requestData);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: event.page - 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page + 1;
    this.getFees(requestData);
  }

  searchFee(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getFees(requestData);
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
    this.getFees(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getFees(requestData);
  }

  getFees(feeParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getFeeList(feeParams).subscribe(data => {
      this.feeList = data.items;
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
