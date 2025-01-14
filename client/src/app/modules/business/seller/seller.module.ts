import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';

//components
import { SellerComponent } from './seller.component';

@NgModule({
  declarations: [SellerComponent],
  imports: [CommonModule, SellerRoutingModule]
})
export class SellerModule {}
