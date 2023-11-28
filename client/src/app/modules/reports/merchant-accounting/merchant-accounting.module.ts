import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantAccountingRoutingModule } from './merchant-accounting-routing.module';

//components
import { MerchantAccountingComponent } from './merchant-accounting.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [MerchantAccountingComponent, ListComponent],
  imports: [CommonModule, MerchantAccountingRoutingModule, SharedModule]
})
export class MerchantAccountingModule {}
