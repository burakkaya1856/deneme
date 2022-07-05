import { NgModule } from '@angular/core';
import { PanelConfirmationRoutingModule } from './panel-confirmation-router.module';
import { SharedModule } from '../../../shared/shared.module';
//components
import { ListComponent } from './list/list.component';
import { PanelConfirmationComponent } from './panel-confirmation.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
@NgModule({
  declarations: [
    ListComponent,
    PanelConfirmationComponent,
    ConfirmationComponent
  ],
  imports: [PanelConfirmationRoutingModule, SharedModule]
})
export class PanelConfirmationModule {}
