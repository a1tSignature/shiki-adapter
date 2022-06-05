import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { PlayerSourceComponent } from './components/player-source/player-source.component';
import { SafePipe } from "#src/app/modules/player/pipes/safe-pipe";


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
  ],
})
export class PlayerModule {}
