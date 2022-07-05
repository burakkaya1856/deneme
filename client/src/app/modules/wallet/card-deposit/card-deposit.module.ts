import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { CardRoutingModule } from './card-deposit-routing.module';
import { SharedModule } from '@app/shared/shared.module';
// Components
import { CardDepositComponent } from './card-deposit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [CardDepositComponent, ListComponent],
  imports: [CommonModule, CardRoutingModule, SharedModule]
})
export class CardDepositModule {}
