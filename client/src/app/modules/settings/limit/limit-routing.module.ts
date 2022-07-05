import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimitComponent } from './limit.component';
import { LimitListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: LimitComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: LimitListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitRoutingModule {}
