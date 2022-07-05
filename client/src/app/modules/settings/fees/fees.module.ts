import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { FeesRoutingModule } from './fees-routing.module';
// Components
import { AddFeeComponent } from './components/add/add.component';
import { FeeDetailsComponent } from './components/details/details.component';
import { UpdateFeeComponent } from './components/update/update.component';
import { FeesComponent } from './fees.component';
import { FeesListComponent } from './list/list.component';

@NgModule({
  declarations: [
    FeesComponent,
    FeesListComponent,
    FeeDetailsComponent,
    AddFeeComponent,
    UpdateFeeComponent
  ],
  imports: [SharedModule, FeesRoutingModule]
})
export class FeesModule {}
