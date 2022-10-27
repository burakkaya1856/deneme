import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService, SettingsService } from '@app/core/http';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-merchant-transactions-list',
  templateUrl: './merchant-transactions-list.component.html',
  styleUrls: ['./merchant-transactions-list.component.scss']
})
export class MerchantTransactionsListComponent implements OnInit {
  bsRangeValue: any;
  start_date: any;
  end_date: any;
  sub: any;
  isLoaded = false;
  emptyMerchantTransactions = null;
  searchData = '';
  merchantTransactionList: any;
  paginationCount = 10;
  statusKeys: any;
  enumData: any;
  pagination = {
    total: null,
    size: null,
    page: null
  };
  maxPage = 5;
  pageInfo = {
    total: null,
    start: null,
    end: null
  };
  selectedStatus = null;
  transactionTypes = null;
  selectedTransactionType = null;

  constructor(private route: ActivatedRoute, private merchantService: MerchantService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.route.data.subscribe(v => (this.sub = v));

    this.settingsService.enumSub.subscribe(data => {
      if (data && data.length > 0) {
        this.enumData = data;

        this.enumData.forEach(item => {
          if (item.State) {
            this.statusKeys = Object.keys(item.State);
          }
        });
      }
    });

    this.merchantService.getMerchantTransactionTypes().subscribe(res => (this.transactionTypes = res));

    let requestData = {
      search: '',
      transaction_status: '',
      transaction_type: '',
      page: 1,
      size: this.paginationCount
    };

    this.merchantService.getAllMerchantTransactions(requestData).subscribe((data: any) => {
      this.merchantTransactionList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pagination.page = data.page;

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1) + 1,
        end: this.pagination.size * this.pagination.page
      };
      this.emptyMerchantTransactions = !this.merchantTransactionList.length ? true : false;
    });
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      transaction_status: this.selectedStatus || '',
      transaction_type: this.selectedTransactionType || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchantsTransactions(requestData);
  }

  getMerchantsTransactions(requestData?: any) {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);
    this.merchantService.getAllMerchantTransactions(requestData).subscribe((data: any) => {
      this.merchantTransactionList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pagination.page = data.page;
      clearTimeout(loadTimeOut);

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1) + 1,
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  searchMerchantTransactions(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      transaction_status: this.selectedStatus || '',
      transaction_type: this.selectedTransactionType || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchantsTransactions(requestData);
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      transaction_status: this.selectedStatus || '',
      transaction_type: this.selectedTransactionType || '',
      page: event.page,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getMerchantsTransactions(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;
    let requestData = {
      search: this.searchData,
      transaction_status: this.selectedStatus || '',
      transaction_type: this.selectedTransactionType || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchantsTransactions(requestData);
  }

  searchTransactionTypes(event: string) {
    // TODO : transaction type filtresi eklenecek apidan transaction type bilgileri bekleniyor
    this.selectedTransactionType = event;
    let requestData = {
      search: this.searchData,
      transaction_status: this.selectedStatus || '',
      transaction_type: this.selectedTransactionType || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchantsTransactions(requestData);
  }

  searchDate(event: any) {
    let startDate = event[0];
    let endDate = event[1];

    this.start_date = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2);

    this.end_date = endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' + ('0' + endDate.getDate()).slice(-2);

    let requestData = {
      search: this.searchData,
      transaction_status: this.selectedStatus || '',
      transaction_type: this.selectedTransactionType || '',
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: 1,
      size: this.paginationCount
    };

    this.getMerchantsTransactions(requestData);
  }
}
