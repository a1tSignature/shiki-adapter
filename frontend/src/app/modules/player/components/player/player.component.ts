import { Component } from '@angular/core';
import { PlayerSourceService } from "#modules/player/services/player-source.service";
import { Metrika } from "ng-yandex-metrika";

@Component({
  selector: `app-player`,
  templateUrl: `./player.component.html`,
  styleUrls: [`./player.component.scss`],
})
export class PlayerComponent {

  constructor(public playerSourceService: PlayerSourceService, public metrika: Metrika) {}

}
