import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantTransactionsListComponent } from './merchant-transactions-list/merchant-transactions-list.component';

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
        component: MerchantTransactionsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantTransactionsRoutingModule {}
