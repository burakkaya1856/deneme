import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
