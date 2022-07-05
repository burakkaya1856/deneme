import { Component, OnInit } from '@angular/core';
import { WalletService } from '@app/core/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TableDetailsModalComponent } from '@app/shared/components/table-details-modal/table-details-modal.component';
import { StorageService } from '../../../../../shared/services/storage.service';
import { DashboardUpdateComponent } from './components/update/update.component';
import { DashboardAddBalance } from './components/add-balance/add-balance.component';
import { Router } from '@angular/router';
import { DashboardRemoveBalance } from './components/remove-balance/remove-balance.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public walletNo: any;
  public bsModalRef: BsModalRef;
  public dashboardData: any;
  public selectCurrency = 'TRY';
  public selectAccount = [];
  public totalBalance = 0;

  constructor(
    private walletService: WalletService,
    public bsModalService: BsModalService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.walletNo = this.storageService.getData('wallet_no');
    this.walletService.getCustomerDashboard(this.walletNo).subscribe(
      data => {
        this.dashboardData = data;
        this.selectAccount = this.dashboardData.accounts.filter(data => {
          return this.selectCurrency == data.currency_code;
        });
        this.totalBalance = 0;
        this.selectAccount.forEach(item => {
          this.totalBalance += item.balance;
        });
      },
      err => {
        this.router.navigate(['/wallet/customer/list']);
      }
    );
  }

  detailHandler(transactionId: string): void {
    this.walletService
      .getTransaction(transactionId)
      .subscribe(transactionData => {
        this.bsModalService.show(TableDetailsModalComponent, {
          initialState: { transactionData }
        });
      });
  }

  updateStatus(walletNo): void {
    let updateData = {
      status: this.dashboardData.status,
      walletNo
    };
    this.bsModalRef = this.bsModalService.show(DashboardUpdateComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: updateData
    });

    this.bsModalRef.content.event.subscribe(data => {
      this.walletService.getCustomerDashboard(this.walletNo).subscribe(data => {
        this.dashboardData = data;
      });
    });
  }

  openAddBalance() {
    this.bsModalRef = this.bsModalService.show(DashboardAddBalance, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        walletNo: this.walletNo
      }
    });
  }

  openRemoveBalance() {
    this.bsModalRef = this.bsModalService.show(DashboardRemoveBalance, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        walletNo: this.walletNo
      }
    });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
