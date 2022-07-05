import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filterResult = new EventEmitter();
  public formSubmitted = false;
  public keyUpNext = null;
  public keyUpFirst = null;
  public firstDateState: boolean;
  public nextDateState: boolean;
  public transactionFilter = this.translate.instant(
    'wallet.customer.detail.components.transactions.components.filter.data'
  );

  public filters = {
    transactionType: null,
    transactionStatus: null,
    showFirstDate: null,
    showNextDate: null,
    minimumAmount: null,
    maximumAmount: null
  };

  setDatepickerLanguage() {
    let lang = this.translate.getDefaultLang();
    if (lang == 'tr') {
      defineLocale('tr', trLocale);
      this.localeService.use('tr');
    }
  }

  constructor(
    private localeService: BsLocaleService,
    private translate: TranslateService
  ) {
    this.setDatepickerLanguage();
  }

  ngOnInit(): void {}

  handlerDateFormat() {
    if (this.firstDateState) {
      if (this.keyUpFirst.length == 2) {
        this.keyUpFirst += '/';
      }
      if (this.keyUpFirst.length == 5) {
        this.keyUpFirst += '/';
      }
    } else if (this.nextDateState) {
      if (this.keyUpNext.length == 2) {
        this.keyUpNext += '/';
      }
      if (this.keyUpNext.length == 5) {
        this.keyUpNext += '/';
      }
    }
  }

  submitForm() {
      let firstDate=null;
      let nextDate=null;

      if(this.filters.showFirstDate){

       firstDate =
        this.filters.showFirstDate.getFullYear() +
        '-' +
        ('0' + (this.filters.showFirstDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + this.filters.showFirstDate.getDate()).slice(-2);
      }

      if(this.filters.showNextDate){
       nextDate =
       this.filters.showNextDate.getFullYear() +
       '-' +
       ('0' + (this.filters.showNextDate.getMonth() + 1)).slice(-2) +
       '-' +
       ('0' + this.filters.showNextDate.getDate()).slice(-2);
      }

      let filterData = {
        transaction_type: this.filters.transactionType,
        transaction_status: this.filters.transactionStatus,
        transaction_date: null,
        start_date: firstDate,
        end_date: nextDate,
        min_amount: this.filters.minimumAmount,
        max_amount: this.filters.maximumAmount,
        page: 0,
        size: 10
      };
      let state = false;
      this.filterResult.emit({ filterData, state });

  }

  clearFilter(): void {
    this.filters = {
      transactionType: null,
      transactionStatus: null,
      showFirstDate: null,
      showNextDate: null,
      minimumAmount: null,
      maximumAmount: null
    };
  }

  closeFilter(): void {
    let filterData = null;
    let state = false;
    this.filterResult.emit({ filterData, state });
  }

  changeType(param: any) {
    this.filters.transactionType = param;
  }

  changeStatus(param: any) {
    this.filters.transactionStatus = param;
  }
}
