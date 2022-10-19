import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { DashboardComponent } from './dashboard.component';
// services,guards etc.
import { routeConfig } from '@core/configs/route.config';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { SelectServiceComponent } from './select-service/select-service.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'select-service',
        pathMatch: 'full'
      },
      {
        path: 'select-service',
        component: SelectServiceComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'select-service',
          permissions: routeConfig['selectService'].permissions
        }
      },
      {
        path: 'panel',
        loadChildren: () =>
          import('../panel/panel.module').then(m => m.PanelModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'panel',
          permissions: routeConfig['panel'].permissions
        }
      },
      {
        path: 'wallet',
        loadChildren: () =>
          import('../wallet/wallet.module').then(m => m.WalletModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'wallet',
          permissions: routeConfig['wallet'].permissions
        }
      },
      // {
      //   path: 'business',
      //   loadChildren: () =>
      //     import('../business/business.module').then(m => m.BusinessModule),
      //   canActivate: [NgxPermissionsGuard],
      //   data: {
      //     routeConfig: 'business',
      //     permissions: routeConfig['business'].permissions
      //   }
      // },
      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then(m => m.ReportsModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'reports',
          permissions: routeConfig['reports'].permissions
        }
      },
      {
        path: 'merchants',
        loadChildren: () =>
          import('../merchant/merchant.module').then(m => m.MerchantModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'merchants',
          permissions: routeConfig['merchants'].permissions
        }
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(m => m.SettingsModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'settings',
          permissions: routeConfig['settings'].permissions
        }
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(m => m.ProfileModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'profile',
          permissions: routeConfig['profile'].permissions
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
