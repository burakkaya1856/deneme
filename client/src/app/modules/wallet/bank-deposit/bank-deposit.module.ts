import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { BankTransferRoutingModule } from './bank-deposit-routing.module';
// Components
import { BankDepositComponent } from './bank-deposit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [BankDepositComponent, ListComponent],
  imports: [CommonModule, SharedModule, BankTransferRoutingModule]
})
export class BankDepositModule {}
