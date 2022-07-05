import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { CardWithdrawComponent } from './card-withdraw.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: CardWithdrawComponent,
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
export class CardWithdrawRoutingModule {}
