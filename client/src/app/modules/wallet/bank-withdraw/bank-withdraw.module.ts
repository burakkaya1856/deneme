import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '@app/shared/shared.module';
import { BankWithdrawRoutingModule } from './bank-withdraw-routing.module';
// Components
import { BankWithdrawComponent } from './bank-withdraw.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [BankWithdrawComponent, ListComponent],
  imports: [SharedModule, BankWithdrawRoutingModule]
})
export class BankWithdrawModule {}
