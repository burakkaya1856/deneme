import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { DetailComponent } from './detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { LimitsComponent } from './limits/limits.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'bank-accounts',
        component: BankAccountsComponent
      },
      {
        path: 'profile',
        component: ProfileInfoComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'limits',
        component: LimitsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule {}
