import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
//components
import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [ProfileComponent, UserComponent, ChangePasswordComponent],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, SharedModule]
})
export class ProfileModule {}
