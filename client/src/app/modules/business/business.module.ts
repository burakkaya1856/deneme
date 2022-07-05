import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { BusinessRoutingModule } from './business-routing.module';
// Components
import { BusinessComponent } from './business.component';

@NgModule({
  declarations: [BusinessComponent],
  imports: [SharedModule, BusinessRoutingModule]
})
export class BusinessModule {}
