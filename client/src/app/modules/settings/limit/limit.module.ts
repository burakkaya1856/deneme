import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@app/shared/shared.module';
// Components
import { AddLimitComponent } from './components/add/add.component';
import { LimitDetailsComponent } from './components/details/details.component';
import { UpdateLimitComponent } from './components/update/update.component';
import { LimitRoutingModule } from './limit-routing.module';
import { LimitComponent } from './limit.component';
import { LimitListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AddLimitComponent,
    LimitComponent,
    UpdateLimitComponent,
    LimitDetailsComponent,
    LimitListComponent
  ],
  imports: [SharedModule, LimitRoutingModule]
})
export class LimitModule {}
