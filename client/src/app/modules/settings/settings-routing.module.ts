import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// services,guards etc.
import { routeConfig } from '@core/configs/route.config';
import { NgxPermissionsGuard } from 'ngx-permissions';

//components
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'bank',
        pathMatch: 'full'
      },
      {
        path: 'bank',
        loadChildren: () =>
          import('./bank/bank.module').then(m => m.BankModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'bank',
          permissions: routeConfig['bank'].permissions
        }
      },
      {
        path: 'bank-accounts',
        loadChildren: () =>
          import('./bank-accounts/bank-accounts.module').then(
            m => m.BankAccountsModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'bankAccounts',
          permissions: routeConfig['bankAccounts'].permissions
        }
      },
      {
        path: 'blacklist',
        loadChildren: () =>
          import('./blacklist/blacklist.module').then(m => m.BlackListModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'blacklist',
          permissions: routeConfig['blacklist'].permissions
        }
      },
      {
        path: 'fraud',
        loadChildren: () =>
          import('./fraud/fraud.module').then(m => m.FraudModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'fraud',
          permissions: routeConfig['fraud'].permissions
        }
      },
      {
        path: 'campaign',
        loadChildren: () =>
          import('./campaign/campaign.module').then(m => m.CampaignModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'campaign',
          permissions: routeConfig['campaign'].permissions
        }
      },
      {
        path: 'limit',
        loadChildren: () =>
          import('./limit/limit.module').then(m => m.LimitModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'limit',
          permissions: routeConfig['limit'].permissions
        }
      },
      {
        path: 'level',
        loadChildren: () =>
          import('./level/level.module').then(m => m.LevelModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'level',
          permissions: routeConfig['level'].permissions
        }
      },
      {
        path: 'fees',
        loadChildren: () =>
          import('./fees/fees.module').then(m => m.FeesModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'fees',
          permissions: routeConfig['fees'].permissions
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
