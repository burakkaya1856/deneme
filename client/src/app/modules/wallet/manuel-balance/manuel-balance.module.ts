import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ManuelBalanceRoutingModule } from './manuel-balance-routing.module';
//components
import { ManuelBalanceComponent } from './manuel-balance.component';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [ManuelBalanceComponent, ListComponent],
  imports: [CommonModule, SharedModule, ManuelBalanceRoutingModule]
})
export class ManuelBalanceModule {}
