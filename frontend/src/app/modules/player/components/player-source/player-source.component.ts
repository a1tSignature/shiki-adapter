import { Component, Input, OnInit } from '@angular/core';
import { PlayerSourceService } from "#modules/player/services/player-source.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PlayerSource, PlayerSources } from "#models/player/player-source";
import { TitleInfo, titleInfoConvertToSa } from "#models/title/title-info";
import { Maybe } from "#types/maybe";
import { SettingsService } from "#services/settings.service";
import { AccountService } from "#modules/login/services/account.service";
import { UserRole } from '#src/app/common/models/user/role/user-role';

@Component({
  selector: `app-player-source`,
  templateUrl: `./player-source.component.html`,
  styleUrls: [`./player-source.component.scss`],
})
export class PlayerSourceComponent implements OnInit {
  public addValNum: number;
  public addValSource: string;
  public addValLink: string;

  public readonly UserRole = UserRole;
  @Input() public title!: Maybe<TitleInfo>;
  public sources: PlayerSource[] = [];

  constructor(
    public accountService: AccountService,
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
      this.sources = this.createSources(sources);
      this.playerSourceService.setSrc(this.sources[0]);

    });
  }

  removeSource(source: any) {
    this.sources = this.sources.filter((item) => item !== source);
    this.saveTitle();
  }

  addSource() {
    const num = this.addValNum;
    const content = this.createContent();
    if (!content[num])
      content[num] = [];

    content[num].push({
      number: num,
      link: this.addValLink,
      source: this.addValSource,
    });

    this.sources = this.createSources(content);
    this.saveTitle();
    // https://ls.player-cname-domain.com/storage.html
  }

  saveTitle() {
    this.accountService.userInfo$.pipe(
      switchMap((user) => {
          const tt = titleInfoConvertToSa(this.title);
          const headers = new HttpHeaders({ [`Authorization`]: `Bearer ${user.jwtToken}` });
          return this.httpClient.post(
            this.settingsService.appSettings.apiEndpoint + `/title/update-title`,
            {
              name: tt.name,
              originalImageLink: tt.originalImageLink,
              content: this.createContent(),
              kind: tt.kind,
              status: tt.status,
              shikimoriId: tt.shikimoriId,
            },
            { headers },
          );
        },
      ),
    ).subscribe();
  }

  private createContent() {
    const content: Record<string, any> = {};
    this.sources.map((item) => {
      if (!content[item.number])
        content[item.number] = [];

      content[item.number].push(item);
    });
    return content;
  }

  private createSources(content: any) {
    const sources = [];
    Object.values(content).map((item: any) => {
      sources.push(...item);
    });
    return sources;
  }
}
