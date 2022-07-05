import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// services,guards etc.
import { routeConfig } from '@core/configs/route.config';
import { NgxPermissionsGuard } from 'ngx-permissions';
//components
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'accounting',
        pathMatch: 'full'
      },
      {
        path: 'accounting',
        loadChildren: () =>
          import('./accounting/accounting.module').then(
            m => m.AccountingModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'accounting',
          permissions: routeConfig['accounting'].permissions
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
