import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { MerchantDetailComponent } from './components/merchant-detail/merchant-detail.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { UpdateMerchantComponent } from './components/update/update.component';

@NgModule({
  declarations: [
    MerchantListComponent,
    MerchantDetailComponent,
    UpdateMerchantComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    AccordionModule
  ]
})
export class MerchantModule {}
