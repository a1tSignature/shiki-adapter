import { Component, OnInit } from '@angular/core';
import { TitleInfo } from "#models/title/title-info";
import { Observable } from "rxjs";
import { TitleService } from "#modules/title/services/title.service";
import { Maybe } from "#types/maybe";

@Component({
  selector: `app-main-page`,
  templateUrl: `./main-page.component.html`,
  styleUrls: [`./main-page.component.scss`],
})
export class MainPageComponent implements OnInit {
  // todo move in separate components
  public titles!: Observable<Maybe<TitleInfo[]>>;

  constructor(
    private titleService: TitleService,
  ) {}

  ngOnInit(): void {
    this.titles = this.titleService.getMockTitles();
  }

}
