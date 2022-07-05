import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//modules
import { DetailRoutingModule } from './detail-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
//components
import { DetailComponent } from './detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { LimitsComponent } from './limits/limits.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DashboardUpdateComponent } from './dashboard/components/update/update.component';
import { ProfileUpdateComponent } from './profile-info/components/update/update.component';
import { FilterComponent } from './transactions/components/filter/filter.component';
import { DashboardAddBalance } from './dashboard/components/add-balance/add-balance.component';
import { DashboardRemoveBalance } from './dashboard/components/remove-balance/remove-balance.component';

@NgModule({
  declarations: [
    DetailComponent,
    DashboardComponent,
    TransactionsComponent,
    ProfileInfoComponent,
    NotificationsComponent,
    LimitsComponent,
    BankAccountsComponent,
    DashboardUpdateComponent,
    ProfileUpdateComponent,
    FilterComponent,
    DashboardAddBalance,
    DashboardRemoveBalance
  ],
  imports: [CommonModule, DetailRoutingModule, SharedModule]
})
export class DetailModule {}
