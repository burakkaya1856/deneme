import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//modules
import { SharedModule } from '@app/shared/shared.module';
import { PanelRoutingModule } from './panel-routing.module';
//components
import { PanelComponent } from './panel.component';

@NgModule({
  declarations: [PanelComponent],
  imports: [CommonModule, PanelRoutingModule, SharedModule]
})
export class PanelModule {}
