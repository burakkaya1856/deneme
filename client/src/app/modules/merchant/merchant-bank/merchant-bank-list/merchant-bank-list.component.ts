import { Component, OnInit } from '@angular/core';
import { MerchantService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MerchantBankAddComponent } from '../components/merchant-bank-add/merchant-bank-add.component';
import { MerchantBankDetailComponent } from '../components/merchant-bank-detail/merchant-bank-detail.component';

@Component({
  selector: 'app-merchant-bank-list',
  templateUrl: './merchant-bank-list.component.html',
  styleUrls: ['./merchant-bank-list.component.scss']
})
export class MerchantBankListComponent implements OnInit {
  bsModalRef: BsModalRef;
  merchantPosBankInstallmentList: any;
  isLoaded = false;
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
  emptyMerchantPosBankInstallments = null;
  searchData = '';
  paginationCount = 10;

  constructor(private bsModalService: BsModalService, private merchantService: MerchantService, private alertService: AlertService) {}

  ngOnInit(): void {
    let requestData = {
      search: '',
      page: 1,
      size: this.paginationCount
    };

    this.getMerchantPosBankInstallments(requestData);
  }

  addMerchantBank() {
    this.bsModalRef = this.bsModalService.show(MerchantBankAddComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {}
    });
  }

  getMerchantPosBankInstallments(params) {
    this.merchantService.getMerchantPosBankInstalments(params).subscribe((data: any) => {
      this.merchantPosBankInstallmentList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pagination.page = data.page;

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1) + 1,
        end: this.pagination.size * this.pagination.page
      };
      this.emptyMerchantPosBankInstallments = !this.merchantPosBankInstallmentList.length ? true : false;
    });
  }

  searchMerchantPosBankInstallments(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchantPosBankInstallments(requestData);
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      page: event.page,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getMerchantPosBankInstallments(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getMerchantPosBankInstallments(requestData);
  }

  merchantPosBankInstallmentDetail(merchantPosBankInstallmentId) {
    this.merchantService.getMerchantPosBankInstalmentById(merchantPosBankInstallmentId).subscribe(res => {
      this.bsModalRef = this.bsModalService.show(MerchantBankDetailComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          merchantPosBankInstallment: res
        }
      });
    });
  }

  merchantPosBankInstallmentEdit(merchantPosBankInstallmentId) {
    this.merchantService.getMerchantPosBankInstalmentById(merchantPosBankInstallmentId).subscribe(res => {
      this.bsModalRef = this.bsModalService.show(MerchantBankAddComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          merchantPosBankInstallment: res
        }
      });
    });
  }

  merchantPosBankInstallmentDelete(merchantPosBankInstallmentId) {
    this.merchantService.deleteMerchantPosBank(merchantPosBankInstallmentId).subscribe((res: any) => {
      this.alertService.setNoticeHandler(res.message, 'success', false);
      let requestData = {
        search: '',
        page: 1,
        size: this.paginationCount
      };
      this.getMerchantPosBankInstallments(requestData);
    });
  }
}
