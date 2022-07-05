import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
//components
import { SettingsComponent } from './settings.component';
@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule]
})
export class SettingsModule {}
