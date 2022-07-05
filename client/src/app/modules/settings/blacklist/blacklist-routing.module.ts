import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlacklistComponent } from './blacklist.component';
import { BlackListListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: BlacklistComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: BlackListListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlacklistRoutingModule {}
