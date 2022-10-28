import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConfig } from '@app/core/configs';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'merchant-applications',
        pathMatch: 'full'
      },
      {
        path: 'merchant-applications',
        loadChildren: () => import('./merchant-applications/merchant-applications.module').then(m => m.MerchantApplicationsModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'merchant-applications',
          permissions: routeConfig['merchantApplications'].permissions
        }
      },
      {
        path: 'merchant-transactions',
        loadChildren: () => import('./merchant-transactions/merchant-transactions.module').then(m => m.MerchantTransactionsModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'merchant-transactions',
          permissions: routeConfig['merchantTransactions'].permissions
        }
      },
      {
        path: 'merchant-bank',
        loadChildren: () => import('./merchant-bank/merchant-bank.module').then(m => m.MerchantBankModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'merchant-bank',
          permissions: routeConfig['merchantBank'].permissions
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {}
