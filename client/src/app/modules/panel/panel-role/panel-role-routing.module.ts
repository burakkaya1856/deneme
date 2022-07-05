import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { PanelRoleComponent } from './panel-role.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: PanelRoleComponent,
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
export class PanelRoleRoutingModule {}
