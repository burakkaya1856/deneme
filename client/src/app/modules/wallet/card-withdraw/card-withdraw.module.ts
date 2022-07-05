import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { CardWithdrawRoutingModule } from './card-withdraw-routing.module';
// Components
import { CardWithdrawComponent } from './card-withdraw.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [CardWithdrawComponent, ListComponent],
  imports: [CardWithdrawRoutingModule,SharedModule]
})
export class CardWithdrawModule {}
