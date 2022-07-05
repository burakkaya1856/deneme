import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { ManuelBalanceComponent } from './manuel-balance.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ManuelBalanceComponent,
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
export class ManuelBalanceRoutingModule {}
