import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosBankListComponent } from './list/list.component';
import { PosBankComponent } from './pos-bank.component';
import { SharedModule } from '@app/shared/shared.module';
import { PosBankRoutingModule } from './pos-bank-routing.module';
import { PosBankDetailComponent } from './components/details/details.component';
import { UpdateBankPosComponent } from './components/update/update.component';
import { AddPosBankComponent } from './components/add/add.component';
@NgModule({
  declarations: [PosBankListComponent, PosBankComponent, PosBankDetailComponent, UpdateBankPosComponent, AddPosBankComponent],
  imports: [CommonModule, SharedModule, PosBankRoutingModule]
})
export class PosBankModule {}
