import { Component } from '@angular/core';
import { PlayerSourceService } from "#modules/player/services/player-source.service";

@Component({
  selector: `app-player`,
  templateUrl: `./player.component.html`,
  styleUrls: [`./player.component.scss`],
})
export class PlayerComponent {

  constructor(public playerSourceService: PlayerSourceService) {}

}
