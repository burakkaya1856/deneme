import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferListComponent } from './list/list.component';
import { TransferComponent } from './transfer.component';

const routes: Routes = [
  {
    path: '',
    component: TransferComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TransferListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule {}
