import { Component, OnInit } from '@angular/core';
import { SettingsService, WalletService } from '@app/core/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableDetailsModalComponent } from '../../../../shared/components/table-details-modal/table-details-modal.component';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'card-withdraw-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  bsRangeValue: any;
  public start_date: any;
  public end_date: any;
  public selectedStatus = null;
  public cardWithdrawData = [];
  public emptyTransaction = null;
  public stateKeys: any;
  public pagination = {
    total: null,
    size: null,
    page: null,
    maxPage: 5
  };
  public searchData: any = '';
  public paginationCount = 10;
  public info = {
    total: null,
    start: null,
    end: null
  };
  public isLoaded = false;

  setDatepickerLanguage() {
    let lang = this.translate.getDefaultLang();
    if (lang == 'tr') {
      defineLocale('tr', trLocale);
      this.localeService.use('tr');
    }
  }

  constructor(
    private bsModalService: BsModalService,
    private walletService: WalletService,
    private localeService: BsLocaleService,
    private translate: TranslateService,
    private settingsService: SettingsService
  ) {
    this.setDatepickerLanguage();
  }

  ngOnInit(): void {
    if (window.innerWidth <= 360) {
      this.pagination.maxPage = 3;
    }

    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: null,
      end_date: null,
      page: 1,
      size: this.paginationCount
    };

    this.walletService.getCardWithdraw(requestData).subscribe(data => {
      this.cardWithdrawData = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pagination.page = data.page;

      this.info = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyTransaction = !this.cardWithdrawData.length ? true : false;
    });

    this.settingsService.enumSub.subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(item => {
          if (item.State) {
            this.stateKeys = Object.keys(item.State).filter(key => {
              return key != 'declined';
            });
          }
        });
      }
    });
  }

  paginationPageChangedHandler(event: any) {
    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: event.page,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getCardWithDraw(requestData);
  }

  searchHandler(event: any) {
    this.searchData = event.trim();

    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getCardWithDraw(requestData);
  }

  paginationCountHandler(event: any) {
    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getCardWithDraw(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;

    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getCardWithDraw(requestData);
  }

  searchDate(event: any) {
    let startDate = event[0];
    let endDate = event[1];

    this.start_date =
      startDate.getFullYear() +
      '-' +
      ('0' + (startDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + startDate.getDate()).slice(-2);

    this.end_date =
      endDate.getFullYear() +
      '-' +
      ('0' + (endDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + endDate.getDate()).slice(-2);

    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: 1,
      size: this.paginationCount
    };

    this.getCardWithDraw(requestData);
  }

  clearDate() {
    this.start_date = null;
    this.end_date = null;
    this.bsRangeValue = null;

    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: 1,
      size: this.paginationCount
    };

    this.pagination.page = 1;
    this.getCardWithDraw(requestData);
  }

  getCardWithDraw(data: any) {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.walletService.getCardWithdraw(data).subscribe(data => {
      this.cardWithdrawData = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.info = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  cardWithDrawDetails(id): void {
    this.walletService.getTransaction(id).subscribe(transactionData => {
      this.bsModalService.show(TableDetailsModalComponent, {
        initialState: { transactionData }
      });
    });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
