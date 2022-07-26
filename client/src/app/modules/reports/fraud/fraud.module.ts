import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FraudRoutingModule } from './fraud-routing.module';

//components
import { FraudComponent } from './fraud.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [FraudComponent, ListComponent],
  imports: [CommonModule, FraudRoutingModule, SharedModule]
})
export class FraudModule {}
