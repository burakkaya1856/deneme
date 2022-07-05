import { NgModule } from '@angular/core';
// modules
import { SharedModule } from '../../../shared/shared.module';
import { BankAccountsRoutingModule } from './panel-permission-routing.module';

// components
import { PanelPermissionComponent } from './panel-permission.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './components/add/add.component';
import { DetailsComponent } from './components/details/details.component';
import { UpdateComponent } from './components/update/update.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    PanelPermissionComponent,
    ListComponent,
    AddComponent,
    DetailsComponent,
    UpdateComponent,
    UsersComponent
  ],
  imports: [SharedModule, BankAccountsRoutingModule]
})
export class PanelPermissionModule {}
