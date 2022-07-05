import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from '../../../shared/shared.module';
import { PanelRoleRoutingModule } from './panel-role-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

//components
import { PanelRoleComponent } from './panel-role.component';
import { ListComponent } from './list/list.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { UpdateComponent } from './components/update/update.component';
import { AddComponent } from './components/add/add.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    PanelRoleComponent,
    ListComponent,
    PermissionsComponent,
    UpdateComponent,
    AddComponent,
    DetailsComponent
  ],
  imports: [CommonModule, SharedModule, PanelRoleRoutingModule, TabsModule]
})
export class PanelRoleModule {}
