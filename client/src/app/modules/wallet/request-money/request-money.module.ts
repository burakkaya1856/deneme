import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { RequestMoneyRoutingModule } from './request-money-routing.module';
// Components
import { RequestMoneyComponent } from './request-money.component';
import { RequestMoneyListComponent } from './list/list.component';

@NgModule({
  declarations: [RequestMoneyComponent, RequestMoneyListComponent],
  imports: [CommonModule, RequestMoneyRoutingModule, SharedModule]
})
export class RequestMoneyModule {}
