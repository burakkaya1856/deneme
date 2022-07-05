import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { BankDepositComponent } from './bank-deposit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: BankDepositComponent,
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
export class BankTransferRoutingModule {}
