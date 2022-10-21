import { Component, OnInit } from '@angular/core';
import { MerchantService, SettingsService } from '@app/core/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MerchantDetailComponent } from '../components/merchant-detail/merchant-detail.component';
import { UpdateMerchantComponent } from '../components/update/update.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  merchantList: any;
  isLoaded = false;
  searchData = '';
  public enumData: any;
  public statusKeys: any;
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
  bsModalRefUpdate: BsModalRef;
  public selectedStatus = null;

  constructor(private merchantService: MerchantService, public bsModalService: BsModalService, private settingsService: SettingsService) {}

  ngOnInit(): void {
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
    let requestData = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };

    this.merchantService.getAllMerchants(requestData).subscribe((data: any) => {
      this.merchantList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * this.pagination.page,
        end: this.pagination.size * this.pagination.page
      };
      this.emptyMerchant = !this.merchantList.length ? true : false;
    });
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
    });
  }

  searchMerchant(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchants(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
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

  updateMerchant(id: any): void {
    this.bsModalRef = this.bsModalService.show(UpdateMerchantComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: { id, enumData: this.enumData }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: this.selectedStatus || '',
        page: this.pagination.page,
        size: this.paginationCount
      };

      this.merchantService.getAllMerchants(requestData).subscribe((data: any) => {
        this.merchantList = data.items;
      });
    });
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: event.page,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getMerchants(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchants(requestData);
  }
}
