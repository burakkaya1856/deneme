import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '@app/shared/shared.module';
// Components
import { CustomerComponent } from './customer.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [CustomerComponent, ListComponent],
  imports: [CommonModule, CustomerRoutingModule, SharedModule]
})
export class CustomerModule {}
