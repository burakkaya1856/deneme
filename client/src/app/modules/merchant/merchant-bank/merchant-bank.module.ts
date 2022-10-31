import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantBankRoutingModule } from './merchant-bank-routing.module';
import { MerchantBankListComponent } from './merchant-bank-list/merchant-bank-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MerchantBankAddComponent } from './components/merchant-bank-add/merchant-bank-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MerchantBankDetailComponent } from './components/merchant-bank-detail/merchant-bank-detail.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [MerchantBankListComponent, MerchantBankAddComponent, MerchantBankDetailComponent],
  imports: [CommonModule, MerchantBankRoutingModule, SharedModule, ReactiveFormsModule, NgxMaskModule.forRoot()]
})
export class MerchantBankModule {}
