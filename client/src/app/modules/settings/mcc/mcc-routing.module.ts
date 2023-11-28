import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MccComponent } from './mcc.component';
import { MccListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: MccComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: MccListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MccRoutingModule {}
