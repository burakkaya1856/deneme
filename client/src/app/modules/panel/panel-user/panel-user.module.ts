import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelUserRoutingModule } from './panel-user-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

//components
import { PanelUserComponent } from './panel-user.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './components/details/details.component';
import { UpdateComponent } from './components/update/update.component';
import { PermissionsComponent } from './components/permissions/permissions.component';

@NgModule({
  declarations: [PanelUserComponent, ListComponent, CreateComponent, DetailsComponent, UpdateComponent, PermissionsComponent],
  imports: [CommonModule, PanelUserRoutingModule, SharedModule, TabsModule]
})
export class PanelUserModule {}
