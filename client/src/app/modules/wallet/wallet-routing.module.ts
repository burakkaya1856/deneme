import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// services,guards etc.
import { routeConfig } from '@core/configs/route.config';
import { NgxPermissionsGuard } from 'ngx-permissions';
//components
import { WalletComponent } from './wallet.component';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
    children: [
      {
        path: '',
        redirectTo: 'customer',
        pathMatch: 'full'
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./customer/customer.module').then(m => m.CustomerModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'customer',
          permissions: routeConfig['customer'].permissions
        }
      },
      {
        path: 'bank-deposit',
        loadChildren: () =>
          import('./bank-deposit/bank-deposit.module').then(
            m => m.BankDepositModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'bankDeposit',
          permissions: routeConfig['bankDeposit'].permissions
        }
      },
      {
        path: 'card-deposit',
        loadChildren: () =>
          import('./card-deposit/card-deposit.module').then(
            m => m.CardDepositModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'cardDeposit',
          permissions: routeConfig['cardDeposit'].permissions
        }
      },
      {
        path: 'transfer',
        loadChildren: () =>
          import('./transfer/transfer.module').then(m => m.TransferModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'transfer',
          permissions: routeConfig['transfer'].permissions
        }
      },
      {
        path: 'request-money',
        loadChildren: () =>
          import('./request-money/request-money.module').then(
            m => m.RequestMoneyModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'requestMoney',
          permissions: routeConfig['requestMoney'].permissions
        }
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then(m => m.InvoiceModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'invoice',
          permissions: routeConfig['invoice'].permissions
        }
      },
      {
        path: 'bank-withdraw',
        loadChildren: () =>
          import('./bank-withdraw/bank-withdraw.module').then(
            m => m.BankWithdrawModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'bankWithdraw',
          permissions: routeConfig['bankWithdraw'].permissions
        }
      },
      {
        path: 'card-withdraw',
        loadChildren: () =>
          import('./card-withdraw/card-withdraw.module').then(
            m => m.CardWithdrawModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'cardWithdraw',
          permissions: routeConfig['cardWithdraw'].permissions
        }
      },
      {
        path: 'donation',
        loadChildren: () =>
          import('./donation/donation.module').then(m => m.DonationModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'donation',
          permissions: routeConfig['donation'].permissions
        }
      },
      {
        path: 'manuel-balance',
        loadChildren: () =>
          import('./manuel-balance/manuel-balance.module').then(
            m => m.ManuelBalanceModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'manuelBalance',
          permissions: routeConfig['manuelBalance'].permissions
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule {}
