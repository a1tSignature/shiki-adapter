import { Component, OnInit } from '@angular/core';
import { TitleInfo } from "#models/title/title-info";
import { TitleService } from "#modules/title/services/title.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Maybe } from "#types/maybe";

@Component({
  selector: `app-titles-list-ongoings`,
  templateUrl: `./titles-list-ongoings.component.html`,
  styleUrls: [`./titles-list-ongoings.component.scss`],
})
export class TitlesListOngoingsComponent implements OnInit {
  public readonly titles$: Observable<Maybe<TitleInfo[]>>;
  private readonly titles = new BehaviorSubject<Maybe<TitleInfo[]>>(null);

  constructor(
    private titleService: TitleService,
  ) {
    this.titles$ = this.titles.asObservable();
  }

  ngOnInit(): void {
    this.titleService.ongoings()
      .subscribe((ongoings) => {
        console.log(`here`, ongoings);
        this.titles.next(ongoings);
      });
  }


}
