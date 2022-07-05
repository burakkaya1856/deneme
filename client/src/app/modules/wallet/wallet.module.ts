import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '@app/shared/shared.module';
import { WalletRoutingModule } from './wallet-routing.module';
// Components
import { WalletComponent } from './wallet.component';

@NgModule({
  declarations: [WalletComponent],
  imports: [SharedModule, WalletRoutingModule]
})
export class WalletModule {}
