import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { TransferRoutingModule } from './transfer-routing.module';
import { SharedModule } from '@app/shared/shared.module';
// Components
import { TransferComponent } from './transfer.component';
import { TransferListComponent } from './list/list.component';

@NgModule({
  declarations: [TransferComponent, TransferListComponent],
  imports: [CommonModule, TransferRoutingModule, SharedModule]
})
export class TransferModule {}
