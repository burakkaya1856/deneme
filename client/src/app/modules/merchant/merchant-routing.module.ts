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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {}
