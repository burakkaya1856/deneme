import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { WalletService } from '@app/core/http/wallet/wallet.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public customerList = [];
  public emptyCustomer = null;
  public selectedStatus = null;
  public statusKeys: any;
  public pagination = {
    total: null,
    size: null,
    page: null
  };
  public maxPage = 5;
  public searchData = '';
  public paginationCount = 10;
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };
  public isLoaded = false;

  constructor(
    public bsModalService: BsModalService,
    private walletService: WalletService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    let requestData = {
      search: '',
      status: '',
      size: this.paginationCount,
      page: 0
    };
    this.walletService.getCustomers(requestData).subscribe(data => {
      this.customerList = data.items;
      this.isLoaded = true;
      this.pagination = {
        total: data.total,
        size: data.size,
        page: data.page + 1
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyCustomer = !this.customerList.length ? true : false;
    });

    this.settingsService.enumSub.subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(item => {
          if (item.Status) {
            this.statusKeys = Object.keys(item.Status).filter(key => {
              return key != 'deleted';
            });
          }
        });
      }
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
    this.getCustomers(requestData);
  }

  searchCustomer(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getCustomers(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getCustomers(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getCustomers(requestData);
  }

  getCustomers(customerParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.walletService.getCustomers(customerParams).subscribe(data => {
      this.isLoaded = true;
      this.customerList = data.items;
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
}
