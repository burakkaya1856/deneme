import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankInstallmentListComponent } from './list/list.component';
import { BankInstallmentComponent } from './bank-installment.component';
const routes: Routes = [
  {
    path: '',
    component: BankInstallmentComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: BankInstallmentListComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankInstallmentRoutingModule {}
