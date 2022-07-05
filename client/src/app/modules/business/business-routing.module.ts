import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessComponent } from './business.component';
// services,guards etc.
import { routeConfig } from '@core/configs/route.config';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      {
        path: '',
        redirectTo: 'seller',
        pathMatch: 'full'
      },
      {
        path: 'seller',
        loadChildren: () =>
          import('./seller/seller.module').then(m => m.SellerModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'seller',
          permissions: routeConfig['seller'].permissions
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {}
