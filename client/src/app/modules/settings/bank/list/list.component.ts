import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AddBankComponent } from '../components/add/add.component';
import { BankDetailsComponent } from '../components/details/details.component';
import { UpdateBankComponent } from '../components/update/update.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bank-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BankListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public bankList = [];
  public currentPage = null;
  public emptyBank = null;
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
    this.settingsService.getBanks(requestData).subscribe(banks => {
      this.bankList = banks.items;
      this.isLoaded = true;

      this.pagination = {
        total: banks.total,
        size: banks.size,
        page: banks.page + 1
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyBank = !this.bankList.length ? true : false;
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

  bankDetails(id: any): void {
    this.settingsService.getBankDetails(id).subscribe(bank => {
      this.bsModalRef = this.bsModalService.show(BankDetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: { bank }
      });
    });
  }

  updateBank(bank): void {
    let bankData = JSON.parse(JSON.stringify(bank));
    this.bsModalRef = this.bsModalService.show(UpdateBankComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        bankData,
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };

      this.settingsService.getBanks(requestData).subscribe(banks => {
        this.bankList = banks.items;
      });
    });
  }

  deleteBank(bank): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.bank.list.delete.headerTitle'
      ),
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
        page: this.pagination.page - 1,
        size: this.paginationCount
      };

      this.settingsService.deleteBank(bank.id).subscribe(res => {
        this.getBanks(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addBank(): void {
    this.bsModalRef = this.bsModalService.show(AddBankComponent, {
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
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.getBanks(requestData);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: event.page - 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page + 1;
    this.getBanks(requestData);
  }

  searchBank(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getBanks(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getBanks(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getBanks(requestData);
  }

  getBanks(bankParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getBanks(bankParams).subscribe(data => {
      this.bankList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
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

    this.pagination.page = requestData.page + 1;
    this.getBanks(requestData);
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
