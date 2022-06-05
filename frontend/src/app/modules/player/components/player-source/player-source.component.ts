import { Component, Input, OnInit } from '@angular/core';
import { PlayerSourceService } from "#modules/player/services/player-source.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PlayerSource } from "#models/player/player-source";
import { TitleInfo } from "#models/title/title-info";
import { Maybe } from "#types/maybe";

@Component({
  selector: `app-player-source`,
  templateUrl: `./player-source.component.html`,
  styleUrls: [`./player-source.component.scss`],
})
export class PlayerSourceComponent implements OnInit {
  @Input() public title!: Maybe<TitleInfo>;
  public sources: PlayerSource[] = [];

  constructor(
    private httpClient: HttpClient,
    public playerSourceService: PlayerSourceService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => this.httpClient.get<PlayerSource[]>(`https://smarthard.net/api/shikivideos/${params.get(`id`)}`)),
    ).subscribe((sources) => {
      sources = sources.sort((a, b) => a.episode - b.episode);
      this.sources = sources;
      this.playerSourceService.setSrc(sources[0]);
    });
  }
}
