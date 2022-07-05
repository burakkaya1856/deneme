import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { PanelConfirmationComponent } from './panel-confirmation.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: PanelConfirmationComponent,
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
export class PanelConfirmationRoutingModule {}
