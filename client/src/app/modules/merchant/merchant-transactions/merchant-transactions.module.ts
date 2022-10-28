import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantTransactionsRoutingModule } from './merchant-transactions-routing.module';
import { MerchantTransactionsListComponent } from './merchant-transactions-list/merchant-transactions-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { MerchantTransactionDetailComponent } from './components/merchant-transaction-detail/merchant-transaction-detail.component';

@NgModule({
  declarations: [MerchantTransactionsListComponent, MerchantTransactionDetailComponent],
  imports: [CommonModule, MerchantTransactionsRoutingModule, SharedModule]
})
export class MerchantTransactionsModule {}
