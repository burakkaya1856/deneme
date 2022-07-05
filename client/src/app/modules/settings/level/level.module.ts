import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { AddLevelComponent } from './components/add/add.component';
import { LevelDetailsComponent } from './components/details/details.component';
import { UpdateLevelComponent } from './components/update/update.component';
import { LevelRoutingModule } from './level-routing.module';
import { LevelComponent } from './level.component';
import { LevelListComponent } from './list/list.component';

@NgModule({
  declarations: [
    LevelComponent,
    LevelListComponent,
    LevelDetailsComponent,
    AddLevelComponent,
    UpdateLevelComponent
  ],
  imports: [SharedModule, LevelRoutingModule]
})
export class LevelModule {}
