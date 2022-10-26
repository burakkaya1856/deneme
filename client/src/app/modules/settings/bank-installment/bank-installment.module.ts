import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BankInstallmentComponent } from './bank-installment.component';
import { AddBankInstallmentComponent } from './components/add/add.component';
import { BankInstallmentDetailsComponent } from './components/details/details.component';
import { UpdateBankInstallmentComponent } from './components/update/update.component';
import { BankInstallmentListComponent } from './list/list.component';
import { BankInstallmentRoutingModule } from './bank-installment-routing.module';
@NgModule({
  declarations: [
    BankInstallmentComponent,
    AddBankInstallmentComponent,
    BankInstallmentDetailsComponent,
    UpdateBankInstallmentComponent,
    BankInstallmentListComponent
  ],
  imports: [CommonModule, SharedModule, BankInstallmentRoutingModule]
})
export class BankInstallmentModule {}
