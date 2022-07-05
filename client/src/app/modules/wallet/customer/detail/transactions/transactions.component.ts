import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TableDetailsModalComponent } from '@app/shared/components/table-details-modal/table-details-modal.component';
//services
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../../../../shared/services/storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WalletService } from '@app/core/http';
//helpers
import { jsonToCsv } from '../../../../../shared/helpers/jsonToCsv';
import { jsonToXlsx } from '../../../../../shared/helpers/jsonToXlsx';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public walletNo: any;
  public bsModalRef: BsModalRef;
  public formSubmitted = false;
  public filteredData = null;
  public fileDownloadKeys: any;
  public fileDownloadTitle: any;
  public months: any;
  public transactionDate: any;
  public emptyTransaction = null;
  public backupTransactionData: any;
  public transactions: any;
  public loading = false;
  public maxPage = 5;
  public filterState = false;
  public dateFilter: any;
  public paginationCount = 10;
  public reloadState = true;
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
    private walletService: WalletService,
    private translateService: TranslateService,
    public bsModalService: BsModalService,
    private storageService: StorageService
  ) {
    this.translateService
      .get('wallet.customer.detail.components.transactions')
      .subscribe(res => {
        this.transactionDate = res.data.transactionDate;
        this.fileDownloadKeys = res.values.fileDownloadKeys;
        this.fileDownloadTitle = res.values.fileDownloadTitle;
        this.months = res.values.months;
      });
  }

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.maxPage = 3;
    }
    this.walletNo = this.storageService.getData('wallet_no');

    let requestData = {
      transaction_type: null,
      transaction_status: null,
      transaction_date: null,
      start_date: null,
      end_date: null,
      min_amount: null,
      max_amount: null,
      page: 0,
      size: 10
    };

    this.walletService
      .getCustomerTransactions(this.walletNo, requestData)
      .subscribe(data => {
        this.transactions = data.items;
        this.emptyTransaction = !this.transactions.length ? true : false;

        this.backupTransactionData = JSON.parse(
          JSON.stringify(this.transactions)
        );
        if (this.transactions.length > 0) {
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
        }
      });
  }

  pageChanged(event: PageChangedEvent): void {
    if (!this.loading) {
      let requestData = {
        transaction_type: null,
        transaction_status: null,
        transaction_date: null,
        start_date: null,
        end_date: null,
        min_amount: null,
        max_amount: null,
        page: event.page - 1,
        size: this.paginationCount
      };
      if (this.filteredData) {
        requestData = this.filteredData;
        requestData.page = event.page - 1;
      }
      if (this.dateFilter) {
        requestData = this.dateFilter;
        requestData.page = event.page - 1;
      }

      this.pagination.page = requestData.page + 1;
      this.getTransaction(this.walletNo, requestData);
    }
  }

  getTransaction(walletNo: any, customerParams: any): void {
    this.loading = true;
    this.walletService
      .getCustomerTransactions(walletNo, customerParams)
      .subscribe(data => {
        this.transactions = data.items;

        this.pagination.total = data.total;
        this.pagination.size = data.size;

        this.pageInfo = {
          total: this.pagination.total,
          start: this.pagination.size * (this.pagination.page - 1),
          end: this.pagination.size * this.pagination.page
        };

        this.loading = false;
      });
  }

  downloadAsCSV(): void {
    let requestData = {
      wallet_no: this.walletNo,
      transaction_type: null,
      transaction_status: null,
      transaction_date: null,
      start_date: null,
      end_date: null,
      min_amount: null,
      max_amount: null,
      page: 0,
      size: 100
    };

    if (this.filteredData) {
      this.filteredData.size = 100;
      requestData = this.filteredData;
    }
    if (this.dateFilter) {
      this.dateFilter.size = 100;
      requestData = this.dateFilter;
    }

    this.walletService
      .getCustomerTransactions(this.walletNo, requestData)
      .subscribe(data => {
        let jsonData = data.items;

        let modifyJsonData = [];

        jsonData.forEach(item => {
          let date = new Date(item.transaction_date);

          item.transaction_date =
            ('0' + date.getDate()).slice(-2) +
            ' ' +
            this.months[date.getMonth()] +
            ' ' +
            date.getFullYear() +
            ' ' +
            ('0' + date.getHours()).slice(-2) +
            ':' +
            ('0' + date.getMinutes()).slice(-2);

          var obj = {};
          item.transaction_type = item.transaction_type.value;

          Object.keys(item).forEach((key, index) => {
            let setKey = this.fileDownloadKeys[index];
            obj[setKey] = item[key];
          });

          modifyJsonData.push(obj);
        });

        jsonData.forEach(item => {
          item.transaction_type = item.transaction_type.value;
        });
        jsonToCsv(modifyJsonData, this.fileDownloadTitle);
      });
  }

  filterEvent(event: any) {
    this.filterState = event.state;

    if (event.filterData != null) {
      event.filterData.wallet_no = this.walletNo;
      this.filteredData = event.filterData;

      this.pagination.page = this.filteredData.page + 1;
      this.getTransaction(this.walletNo, this.filteredData);
    }
  }

  changeDate(param: any) {
    let requestData = {
      wallet_no: this.walletNo,
      transaction_type: null,
      transaction_status: null,
      transaction_date: param,
      start_date: null,
      end_date: null,
      min_amount: null,
      max_amount: null,
      page: 0,
      size: this.paginationCount
    };

    this.dateFilter = requestData;
    this.pagination.page = requestData.page + 1;
    this.filteredData = null;
    this.getTransaction(this.walletNo, this.dateFilter);
  }

  reloadData() {
    let requestData = {
      wallet_no: this.walletNo,
      transaction_type: null,
      transaction_status: null,
      transaction_date: null,
      start_date: null,
      end_date: null,
      min_amount: null,
      max_amount: null,
      page: 0,
      size: this.paginationCount
    };
    this.reloadState = false;
    setTimeout(() => {
      this.reloadState = true;
    }, 100);
    this.filteredData = null;
    this.dateFilter = null;
    this.getTransaction(this.walletNo, requestData);
  }

  detailHandler(transactionId: string): void {
    this.walletService
      .getTransaction(transactionId)
      .subscribe(transactionData => {
        this.bsModalService.show(TableDetailsModalComponent, {
          initialState: {
            transactionData: transactionData,
            sendTransactionEmail: true
          }
        });
      });
  }

  downloadXlsx() {
    let requestData = {
      wallet_no: this.walletNo,
      transaction_type: null,
      transaction_status: null,
      transaction_date: null,
      start_date: null,
      end_date: null,
      min_amount: null,
      max_amount: null,
      page: 0,
      size: 100
    };

    if (this.filteredData) {
      this.filteredData.size = 100;
      requestData = this.filteredData;
    }
    if (this.dateFilter) {
      this.dateFilter.size = 100;
      requestData = this.dateFilter;
    }

    this.walletService
      .getCustomerTransactions(this.walletNo, requestData)
      .subscribe(data => {
        let jsonData = data.items;

        let modifyJsonData = [];

        jsonData.forEach(item => {
          let date = new Date(item.transaction_date);

          item.transaction_date =
            ('0' + date.getDate()).slice(-2) +
            ' ' +
            this.months[date.getMonth()] +
            ' ' +
            date.getFullYear();

          var obj = {};
          item.transaction_type = item.transaction_type.value;

          Object.keys(item).forEach((key, index) => {
            let setKey = this.fileDownloadKeys[index];
            obj[setKey] = item[key];
          });

          modifyJsonData.push(obj);
        });

        let exportXlsx = new jsonToXlsx();

        exportXlsx.exportAsExcelFile(modifyJsonData, this.fileDownloadTitle);
      });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
