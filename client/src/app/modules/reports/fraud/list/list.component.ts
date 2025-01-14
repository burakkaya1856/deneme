import { Component, OnInit } from '@angular/core';
import { ReportService } from '@app/core/http/report/report.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fraud-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public reportList = [];
  public emptyReport = null;
  public totalReserve = null;
  public maxPage = 5;

  public searchData = '';
  public paginationCount = 10;
  public reserveDate = '';
  public bsDateValue: any;
  public isLoaded = false;
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
    private reportService: ReportService,
    private localeService: BsLocaleService,
    private translate: TranslateService
  ) {
    this.setDatepickerLanguage();
  }

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    let requestData = {
      q: '',
      reserve_date: this.reserveDate,
      page: 1,
      size: this.paginationCount
    };
    this.reportService.getFraudList(requestData).subscribe(data => {
      this.reportList = data.items;
      this.isLoaded = true;

      this.pagination = {
        total: data.total,
        size: data.size,
        page: data.page
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };

      if (this.reportList && this.reportList.length == 0) {
        this.emptyReport = true;
      } else {
        this.emptyReport = false;
      }
    });
    let totalReserveRequest = {
      reserve_date: ''
    };
    this.reportService.getTotalReserve(totalReserveRequest).subscribe(data => {
      this.totalReserve = data.total_balance;
    });
  }

  setDatepickerLanguage() {
    let lang = this.translate.getDefaultLang();
    if (lang == 'tr') {
      defineLocale('tr', trLocale);
      this.localeService.use('tr');
    }
  }

  searchHandler(event: any) {
    this.searchData = event.trim();

    let requestData = {
      q: this.searchData,
      reserve_date: this.reserveDate,
      page: 1,
      size: this.paginationCount
    };
    this.getReports(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      q: this.searchData,
      reserve_date: this.reserveDate,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getReports(requestData);
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      q: this.searchData,
      reserve_date: this.reserveDate,
      page: event.page,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getReports(requestData);
  }

  getReports(reportParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.reportService.getFraudList(reportParams).subscribe(data => {
      this.reportList = data.items;
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

  searchDate(event: any) {
    let date = event;

    this.reserveDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2);

    let requestData = {
      q: this.searchData,
      reserve_date: this.reserveDate,
      page: 1,
      size: this.paginationCount
    };

    this.getReports(requestData);

    let totalReserveRequest = {
      reserve_date: this.reserveDate
    };
    this.getTotalReserve(totalReserveRequest);
  }

  clearDate() {
    this.reserveDate = '';
    this.bsDateValue = null;

    let requestData = {
      q: this.searchData,
      reserve_date: this.reserveDate,
      page: 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getReports(requestData);
    let totalReserveRequest = {
      reserve_date: this.reserveDate
    };
    this.getTotalReserve(totalReserveRequest);
  }

  getTotalReserve(requestData: any) {
    this.reportService.getTotalReserve(requestData).subscribe(data => {
      this.totalReserve = data.total_balance;
    });
  }

}
