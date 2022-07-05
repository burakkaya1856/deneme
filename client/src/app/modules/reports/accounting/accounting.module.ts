import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingRoutingModule } from './accounting-routing.module';

//components
import { AccountingComponent } from './accounting.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [AccountingComponent, ListComponent],
  imports: [CommonModule, AccountingRoutingModule, SharedModule]
})
export class AccountingModule {}
