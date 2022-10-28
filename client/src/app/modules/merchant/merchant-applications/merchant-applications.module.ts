import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantApplicationsRoutingModule } from './merchant-applications-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantDetailComponent } from './components/merchant-detail/merchant-detail.component';
import { UpdateMerchantComponent } from './components/update/update.component';
import { MerchantApplicationsComponent } from './merchant-applications.component';

@NgModule({
  declarations: [MerchantListComponent, MerchantDetailComponent, UpdateMerchantComponent, MerchantApplicationsComponent],
  imports: [CommonModule, MerchantApplicationsRoutingModule, FormsModule, TranslateModule, SharedModule, AccordionModule]
})
export class MerchantApplicationsModule {}
