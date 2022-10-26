import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosBankComponent } from './pos-bank.component';
import { PosBankListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: PosBankComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: PosBankListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosBankRoutingModule {}
