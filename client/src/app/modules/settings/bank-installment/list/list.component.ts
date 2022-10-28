import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { AddBankInstallmentComponent } from '../components/add/add.component';
import { UpdateBankInstallmentComponent } from '../components/update/update.component';
import { BankInstallmentDetailsComponent } from '../components/details/details.component';

@Component({
  selector: 'bank-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BankInstallmentListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public bankInstallmentList = [];
  public currentPage = null;
  public emptyList = null;
  public deleteModal = false;
  public enumData: any;
  public statusKeys: any;
  public deleteModalData: any;
  public pagination = {
    total: null,
    size: null,
    page: null
  };
  public maxPage = 5;
  public searchData = '';
  public selectedStatus = null;
  public paginationCount = 10;
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };
  public isLoaded = false;

  constructor(
    public bsModalService: BsModalService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    let requestData = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };
    this.settingsService.getBankInstallments(requestData).subscribe(bankInstallments => {
      this.bankInstallmentList = bankInstallments.items;
      this.isLoaded = true;

      this.pagination = {
        total: bankInstallments.total,
        size: bankInstallments.size,
        page: bankInstallments.page
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * this.pagination.page,
        end: this.pagination.size * this.pagination.page
      };
      this.emptyList = !this.bankInstallmentList.length ? true : false;
    });

    this.settingsService.enumSub.subscribe(data => {
      if (data && data.length > 0) {
        this.enumData = data;

        this.enumData.forEach(item => {
          if (item.Status) {
            this.statusKeys = Object.keys(item.Status);
          }
        });
      }
    });
  }

  bankInstallmentDetails(id: any): void {
    this.settingsService.getBankInstallmentDetails(id).subscribe(bankInstallmentData => {
      this.bsModalRef = this.bsModalService.show(BankInstallmentDetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: { bankInstallmentData }
      });
    });
  }

  updateBankInstallment(bankInstallment): void {
    let bankInstallmentData = JSON.parse(JSON.stringify(bankInstallment));
    this.bsModalRef = this.bsModalService.show(UpdateBankInstallmentComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        bankInstallmentData,
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: this.pagination.page,
        size: this.paginationCount
      };

      this.settingsService.getBankInstallments(requestData).subscribe(banks => {
        this.bankInstallmentList = banks.items;
      });
    });
  }

  deleteBankInstallment(installment): void {
    const initialState = {
      title: this.translateService.instant('settings.bank.list.delete.headerTitle'),
      subtitle: this.translateService.instant('settings.bank.list.delete.title')
    };
    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: initialState
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: this.searchData,
        status: this.selectedStatus || '',
        page: this.pagination.page,
        size: this.paginationCount
      };

      this.settingsService.deleteBankInstallment(installment.id).subscribe(res => {
        this.getBankIntallments(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addBankInstallment(): void {
    this.bsModalRef = this.bsModalService.show(AddBankInstallmentComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: this.pagination.page,
        size: this.paginationCount
      };
      this.getBankIntallments(requestData);
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
    this.getBankIntallments(requestData);
  }

  searchBank(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getBankIntallments(requestData);
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
    this.getBankIntallments(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getBankIntallments(requestData);
  }

  getBankIntallments(bankParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getBankInstallments(bankParams).subscribe(data => {
      this.bankInstallmentList = data.items;
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

  statusChangeHandler(event: any) {
    this.selectedStatus = event;
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getBankIntallments(requestData);
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
