import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AddBankAccountComponent } from '../components/add/add.component';
import { BankAccoundDetailsModalComponent } from '../components/details/details.component';
import { BankAccountUpdateModalComponent } from '../components/update/update.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bank-accounts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BankAccountsListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public accountList = [];
  public emptyAccount = null;
  public enumData: any;
  public statusKeys: any;
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
      page: 0,
      size: this.paginationCount
    };

    this.settingsService.getBankAccounts(requestData).subscribe(accounts => {
      this.accountList = accounts.items;
      this.isLoaded = true;
      this.pagination = {
        total: accounts.total,
        size: accounts.size,
        page: accounts.page + 1
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyAccount = !this.accountList.length ? true : false;
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

  accountDetails(id: any): void {
    this.settingsService.getBankAccount(id).subscribe(bankAccount => {
      this.bsModalRef = this.bsModalService.show(
        BankAccoundDetailsModalComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            bankAccount
          }
        }
      );
    });
  }

  updateAccount(account): void {
    let bankAccountData = JSON.parse(JSON.stringify(account));

    this.bsModalRef = this.bsModalService.show(
      BankAccountUpdateModalComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          bankAccountData,
          enumData: this.enumData
        }
      }
    );
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };

      this.settingsService.getBankAccounts(requestData).subscribe(accounts => {
        this.accountList = accounts.items;
      });
    });
  }

  deleteAccount(account): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.bankAccounts.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant(
        'settings.bankAccounts.list.delete.title'
      )
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
      this.settingsService.deleteBankAccount(account.id).subscribe(res => {
        this.getAccounts(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addAccount(): void {
    this.bsModalRef = this.bsModalService.show(AddBankAccountComponent, {
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
      this.getAccounts(requestData);
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
    this.getAccounts(requestData);
  }

  searchAccount(event: string): void {
    this.searchData = event.trim();

    if (this.searchData.includes('TR')) {
      this.searchData = this.searchData.replace(/\s/g, '');
    }
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getAccounts(requestData);
  }

  filterStatus(event: string): void {
    this.selectedStatus = event;

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getAccounts(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getAccounts(requestData);
  }

  getAccounts(accountParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getBankAccounts(accountParams).subscribe(data => {
      this.accountList = data.items;
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

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
