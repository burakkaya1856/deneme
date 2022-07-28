import { Component, OnInit } from '@angular/core';
//services
import { SettingsService, WalletService } from '@app/core/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';
//requirements
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { TableDetailsModalComponent } from '@app/shared/components/table-details-modal/table-details-modal.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  bsRangeValue: any;
  public start_date: any;
  public end_date: any;
  public bsModalRef: BsModalRef;
  public donationList = [];
  public selectedStatus = null;
  public emptyDonation = null;
  public stateKeys: any;
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
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: null,
      end_date: null,
      page: 1,
      size: this.paginationCount
    };

    this.walletService.getDonationList(requestData).subscribe(data => {
      this.donationList = data.items;
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
      this.emptyDonation = !this.donationList.length ? true : false;
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

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: event.page,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getDonations(requestData);
  }

  searchRequest(event: string): void {
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
    this.getDonations(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      q: this.searchData,
      status: this.selectedStatus || null,
      start_date: this.start_date || null,
      end_date: this.end_date || null,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getDonations(requestData);
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
    this.getDonations(requestData);
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

    this.getDonations(requestData);
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
    this.getDonations(requestData);
  }

  getDonations(requestParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.walletService.getDonationList(requestParams).subscribe(data => {
      this.donationList = data.items;
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

  transferDetails(id): void {
    this.walletService.getTransaction(id).subscribe(transactionData => {
      this.bsModalService.show(TableDetailsModalComponent, {
        initialState: {
          transactionData: transactionData,
          sendTransactionEmail: false
        }
      });
    });
  }
}
