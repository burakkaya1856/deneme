import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { BlacklistRoutingModule } from './blacklist-routing.module';
// Components
import { BlacklistComponent } from './blacklist.component';
import { AddBlacklistComponent } from './components/add/add.component';
import { BlacklistDetailsComponent } from './components/details/details.component';
import { UpdateBlacklistComponent } from './components/update/update.component';
import { BlackListListComponent } from './list/list.component';

@NgModule({
  declarations: [
    BlacklistComponent,
    BlackListListComponent,
    AddBlacklistComponent,
    UpdateBlacklistComponent,
    BlacklistDetailsComponent
  ],
  imports: [SharedModule, BlacklistRoutingModule]
})
export class BlackListModule {}
