import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { DonationComponent } from './donation.component';
import { DonationRoutingModule } from './donation-routing.module';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [DonationComponent, ListComponent],
  imports: [CommonModule, SharedModule, DonationRoutingModule]
})
export class DonationModule {}
