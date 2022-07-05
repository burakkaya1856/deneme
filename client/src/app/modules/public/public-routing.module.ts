import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from '@shared/components/notfound/notfound.component';
import { NotaccessComponent } from '@shared/components/notaccess/notaccess.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          config: 'login'
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'register-complete',
        component: RegisterCompleteComponent
      },
      {
        path: '403',
        component: NotaccessComponent
      },
      {
        path: '404',
        component: NotfoundComponent,
        data: {
          config: 'notfound'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
