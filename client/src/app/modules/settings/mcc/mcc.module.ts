import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { MccRoutingModule } from './mcc-routing.module';
import { MccComponent } from './mcc.component';
import { MccListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MccComponent,
    MccListComponent

  ],
  imports: [SharedModule, MccRoutingModule]
})
export class MccModule {}
