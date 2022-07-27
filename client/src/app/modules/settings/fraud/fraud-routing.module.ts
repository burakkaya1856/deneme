import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraudComponent } from './fraud.component';
import { FraudListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: FraudComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: FraudListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraudRoutingModule {}
