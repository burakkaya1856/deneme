import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@shared/shared.module';
// routings
import { DashboardRoutingModule } from './dashboard-routing.module';
// components
import { DashboardComponent } from './dashboard.component';
import { SelectServiceComponent } from './select-service/select-service.component';

@NgModule({
  declarations: [DashboardComponent, SelectServiceComponent],
  imports: [SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
