import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantBankListComponent } from './merchant-bank-list/merchant-bank-list.component';

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
        component: MerchantBankListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantBankRoutingModule {}
