import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";
import { TitleService } from "#modules/title/services/title.service";

@Component({
  selector: `app-titles-list-updates`,
  templateUrl: `./titles-list-updates.component.html`,
  styleUrls: [`./titles-list-updates.component.scss`],
})
export class TitlesListUpdatesComponent implements OnInit {
  public readonly titles$: Observable<Maybe<TitleInfo[]>>;
  private readonly titles = new Subject<Maybe<TitleInfo[]>>();

  constructor(
    private titleService: TitleService,
  ) {
    this.titles$ = this.titles.asObservable();
  }

  ngOnInit(): void {
    this.titleService.updates()
      .subscribe((updates) => {
        this.titles.next(updates);
      });
  }

}
