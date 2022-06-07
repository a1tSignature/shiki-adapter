import { Component, Input, OnInit } from '@angular/core';
import { PlayerSourceService } from "#modules/player/services/player-source.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PlayerSource, PlayerSources } from "#models/player/player-source";
import { TitleInfo } from "#models/title/title-info";
import { Maybe } from "#types/maybe";
import { SettingsService } from "#services/settings.service";

@Component({
  selector: `app-player-source`,
  templateUrl: `./player-source.component.html`,
  styleUrls: [`./player-source.component.scss`],
})
export class PlayerSourceComponent implements OnInit {
  @Input() public title!: Maybe<TitleInfo>;
  public sources: PlayerSource[] = [];

  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
    public playerSourceService: PlayerSourceService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params) =>
        this.httpClient
          .post<PlayerSources>(
            `${this.settingsService.appSettings.apiEndpoint}/title`,
            { shikimoriId: params.get(`id`) },
            { headers: { [`Content-Type`]: `application/json` } },
          ),
      ),
    ).subscribe((sources) => {
      this.sources.length = 0;
      Object.values(sources).map((item) => {
        this.sources.push(...item);
      });
      this.playerSourceService.setSrc(this.sources[0]);

    });
  }
}
