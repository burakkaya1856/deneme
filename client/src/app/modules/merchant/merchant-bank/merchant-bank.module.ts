import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantBankRoutingModule } from './merchant-bank-routing.module';
import { MerchantBankListComponent } from './merchant-bank-list/merchant-bank-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MerchantBankAddComponent } from './components/merchant-bank-add/merchant-bank-add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MerchantBankListComponent, MerchantBankAddComponent],
  imports: [CommonModule, MerchantBankRoutingModule, SharedModule, ReactiveFormsModule]
})
export class MerchantBankModule {}
