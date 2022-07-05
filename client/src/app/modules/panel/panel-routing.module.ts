import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// services,guards etc.
import { routeConfig } from '@core/configs/route.config';
import { NgxPermissionsGuard } from 'ngx-permissions';

//components
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'panel-user',
        loadChildren: () =>
          import('./panel-user/panel-user.module').then(m => m.PanelUserModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'panelUser',
          permissions: routeConfig['panelUser'].permissions
        }
      },
      {
        path: 'panel-permission',
        loadChildren: () =>
          import('./panel-permission/panel-permission.module').then(
            m => m.PanelPermissionModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'panelPermission',
          permissions: routeConfig['panelPermission'].permissions
        }
      },
      {
        path: 'panel-role',
        loadChildren: () =>
          import('./panel-role/panel-role.module').then(m => m.PanelRoleModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'panelRole',
          permissions: routeConfig['panelRole'].permissions
        }
      },
      {
        path: 'panel-confirmation',
        loadChildren: () =>
          import('./panel-confirmation/panel-confirmation.module').then(
            m => m.PanelConfirmationModule
          ),
        canActivate: [NgxPermissionsGuard],
        data: {
          routeConfig: 'panelConfirmation',
          permissions: routeConfig['panelConfirmation'].permissions
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {}
