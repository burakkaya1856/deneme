import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
// routings
import { PublicRoutingModule } from './public-routing.module';
// components
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';

@NgModule({
  declarations: [
    LoginComponent,
    PublicComponent,
    ForgotPasswordComponent,
    RegisterCompleteComponent
  ],
  imports: [SharedModule, PublicRoutingModule, FormsModule]
})
export class PublicModule {}
