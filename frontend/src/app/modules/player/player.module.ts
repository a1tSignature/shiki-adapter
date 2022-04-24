import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { PlayerSourceComponent } from './components/player-source/player-source.component';


@NgModule({
  declarations: [
    PlayerComponent,
    PlayerSourceComponent,
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
