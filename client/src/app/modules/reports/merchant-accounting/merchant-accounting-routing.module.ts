import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantAccountingComponent } from './merchant-accounting.component';
import {ListComponent} from './list/list.component';
const routes: Routes = [
  {
    path: '',
    component: MerchantAccountingComponent,
    children: [
       {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path:'list',
      component:ListComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantAccountingRoutingModule {}

