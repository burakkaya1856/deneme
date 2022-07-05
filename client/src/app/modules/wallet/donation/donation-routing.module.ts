import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationComponent } from './donation.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: DonationComponent,
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
export class DonationRoutingModule {}
