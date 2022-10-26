import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './merchant-list/merchant-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: MerchantListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantApplicationsRoutingModule {}
