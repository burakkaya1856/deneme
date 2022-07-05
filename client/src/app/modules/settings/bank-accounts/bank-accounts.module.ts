import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { BankAccountsRoutingModule } from './bank-accounts-routing.module';
// Components
import { BankAccountsComponent } from './bank-accounts.component';
import { AddBankAccountComponent } from './components/add/add.component';
import { BankAccoundDetailsModalComponent } from './components/details/details.component';
import { BankAccountUpdateModalComponent } from './components/update/update.component';
import { BankAccountsListComponent } from './list/list.component';

@NgModule({
  declarations: [
    BankAccountsComponent,
    BankAccountsListComponent,
    BankAccountUpdateModalComponent,
    BankAccoundDetailsModalComponent,
    AddBankAccountComponent
  ],
  imports: [SharedModule, BankAccountsRoutingModule]
})
export class BankAccountsModule {}
