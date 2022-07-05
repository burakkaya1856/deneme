import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { CampaignRoutingModule } from './campaign-routing.module';

// Components
import { CampaignComponent } from './campaign.component';
import { AddCampaignComponent } from './components/add/add.component';
import { CampaignDetailsComponent } from './components/details/details.component';
import { UpdateCampaignComponent } from './components/update/update.component';
import { CampaignListComponent } from './list/list.component';

@NgModule({
  declarations: [
    CampaignComponent,
    CampaignListComponent,
    UpdateCampaignComponent,
    AddCampaignComponent,
    CampaignDetailsComponent
  ],
  imports: [SharedModule, CampaignRoutingModule]
})
export class CampaignModule {}
