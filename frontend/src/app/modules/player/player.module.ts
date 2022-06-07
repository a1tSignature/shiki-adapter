import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { PlayerSourceComponent } from './components/player-source/player-source.component';
import { SafePipe } from "#src/app/modules/player/pipes/safe-pipe";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    PlayerComponent,
    PlayerSourceComponent,
    SafePipe,
  ],
  exports: [
    PlayerComponent,
    PlayerSourceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class PlayerModule {}
