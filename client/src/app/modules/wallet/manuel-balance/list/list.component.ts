import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WalletService } from '@app/core/http';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public balanceList = [];
  public bsModalRef: BsModalRef;
  public emptyBalance = null;
  public searchData: any = '';
  public paginationCount = 10;
  public isLoaded = false;
  public params = {
    q: '',
    page: 1,
    size: 10
  };
  public pagination = {
    total: null,
    size: null,
    page: null,
    maxPage: 5
  };
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };

  constructor(
    private bsModalService: BsModalService,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.pagination.maxPage = 3;
    }
    let requestData = {
      q: '',
      page: 1,
      size: 10
    };
    this.walletService.getManuelBalanceList(requestData).subscribe(data => {
      this.balanceList = data.items;

      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pagination.page = data.page;

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };

      if (this.balanceList.length == 0) {
        this.emptyBalance = true;
      } else {
        this.emptyBalance = false;
      }
    });
  }

  paginationPageChangedHandler(event: any) {
    let paramsData = {
      q: this.searchData,
      page: event.page,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page;
    this.getBalanceList(paramsData);
  }

  searchHandler(event: any) {
    this.searchData = event.trim();

    let paramsData = {
      q: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page;
    this.getBalanceList(paramsData);
  }

  paginationCountHandler(event: any) {
    this.paginationCount = event;

    let paramsData = {
      q: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page;
    this.getBalanceList(paramsData);
  }

  getBalanceList(data: any) {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.walletService.getManuelBalanceList(data).subscribe(data => {
      this.balanceList = data.items;
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

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
