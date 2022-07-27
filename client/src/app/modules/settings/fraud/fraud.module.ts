import { NgModule } from "@angular/core";
// Modules
import { SharedModule } from "@app/shared/shared.module";
import { FraudRoutingModule } from "./fraud-routing.module";
import { FraudComponent } from "./fraud.component";
// Components
import { FraudDetailsComponent } from "./components/details/details.component";
import { UpdateFraudComponent } from "./components/update/update.component";
import { FraudListComponent } from "./list/list.component";

@NgModule({
  declarations: [UpdateFraudComponent,FraudDetailsComponent,FraudComponent,FraudListComponent],
  imports: [SharedModule,FraudRoutingModule]
})

export class FraudModule{}
