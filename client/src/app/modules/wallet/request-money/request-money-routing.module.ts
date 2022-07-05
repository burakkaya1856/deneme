import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestMoneyListComponent } from './list/list.component';
import { RequestMoneyComponent } from './request-money.component';

const routes: Routes = [
  {
    path: '',
    component: RequestMoneyComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: RequestMoneyListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMoneyRoutingModule {}
