import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { PanelPermissionComponent } from './panel-permission.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: PanelPermissionComponent,
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
export class BankAccountsRoutingModule {}
