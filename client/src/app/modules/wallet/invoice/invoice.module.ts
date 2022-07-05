import { NgModule } from '@angular/core';
//modules
import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from '@app/shared/shared.module';
//components
import { InvoiceComponent } from './invoice.component';
import { InvoiceListComponent } from './list/list.component';

@NgModule({
  declarations: [InvoiceComponent, InvoiceListComponent],
  imports: [InvoiceRoutingModule, SharedModule]
})
export class InvoiceModule {}
