import { Component, OnInit } from '@angular/core';
import { MerchantService } from '@app/core/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';

@Component({
  selector: 'merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  merchantList: any;
  isLoaded = false;
  searchData = '';
  paginationCount = 10;
  pagination = {
    total: null,
    size: null,
    page: null
  };
  pageInfo = {
    total: null,
    start: null,
    end: null
  };
  emptyMerchant = null;
  bsModalRef: BsModalRef;

  constructor(
    private merchantService: MerchantService,
    public bsModalService: BsModalService
  ) {}

  ngOnInit(): void {
    let requestData = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };
    this.getMerchants(requestData);
  }

  getMerchants(requestData?: any) {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);
    this.merchantService.getAllMerchants(requestData).subscribe((data: any) => {
      this.merchantList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * this.pagination.page,
        end: this.pagination.size * this.pagination.page
      };

      this.emptyMerchant = !this.merchantList.length ? true : false;
    });
  }

  searchBank(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchants(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchants(requestData);
  }

  merchantDetail(id: any): void {
    // TODO : merchant detay bilgileri çekilecek
    this.merchantService.getMerchantDetail(id).subscribe(merchant => {
      this.bsModalRef = this.bsModalService.show(MerchantDetailComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: { merchant }
      });
    });
  }
}
