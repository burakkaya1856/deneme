import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FraudDetailsComponent } from '../components/details/details.component';
import { UpdateFraudComponent } from '../components/update/update.component';

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
  private requestData = {
    search: '',
    status: '',
    page: 1,
    size: this.paginationCount
  };

  constructor(
    public bsModalService: BsModalService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    this.getFrauds();

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
        fraudData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      this.requestData = { ...this.requestData, search: '', status: '' };

      this.getFrauds();
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.requestData = {
      ...this.requestData,
      page: event.page
    };

    this.pagination.page = this.requestData.page;
    this.getFrauds();
  }

  searchFraud(event: string): void {
    this.searchData = event.trim();

    this.requestData = {
      ...this.requestData,
      search: this.searchData,
      page: 1
    };
    this.pagination.page = this.requestData.page;
    this.getFrauds();
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;
    this.requestData = {
      ...this.requestData,
      status: this.selectedStatus || '',
      page: 1
    };
    this.pagination.page = this.requestData.page;
    this.getFrauds();
  }

  paginationCountChange(): void {
    this.requestData = {
      ...this.requestData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = this.requestData.page;
    this.getFrauds();
  }

  getFrauds(): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getFrauds(this.requestData).subscribe(data => {
      this.fraudList = data.items;
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

  statusChangeHandler(event: any) {
    this.selectedStatus = event;
    this.requestData = {
      ...this.requestData,
      status: this.selectedStatus || '',
      page: 1,
    };

    this.pagination.page = this.requestData.page;
    this.getFrauds();
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
