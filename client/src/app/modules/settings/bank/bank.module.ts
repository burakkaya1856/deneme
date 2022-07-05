import { NgModule } from "@angular/core";
// Modules
import { SharedModule } from "@app/shared/shared.module";
import { BankRoutingModule } from "./bank-routing.module";
import { BankComponent } from "./bank.component";
// Components
import { AddBankComponent } from "./components/add/add.component";
import { BankDetailsComponent } from "./components/details/details.component";
import { UpdateBankComponent } from "./components/update/update.component";
import { BankListComponent } from "./list/list.component";

@NgModule({
  declarations: [AddBankComponent,UpdateBankComponent,BankDetailsComponent,BankComponent,BankListComponent],
  imports: [SharedModule,BankRoutingModule]
})

export class BankModule{}
