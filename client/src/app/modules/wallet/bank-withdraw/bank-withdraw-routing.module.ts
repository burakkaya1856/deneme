import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankWithdrawComponent } from './bank-withdraw.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: BankWithdrawComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankWithdrawRoutingModule {}
