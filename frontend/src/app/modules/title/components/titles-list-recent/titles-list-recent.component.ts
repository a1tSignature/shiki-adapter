import { Component } from '@angular/core';
import { RecentTitlesService } from "#modules/title/services/recent-titles.service";

@Component({
  selector: `app-titles-list-recent`,
  templateUrl: `./titles-list-recent.component.html`,
  styleUrls: [`./titles-list-recent.component.scss`],
})
export class TitlesListRecentComponent {

  constructor(
    public recentTitlesService: RecentTitlesService,
  ) { }

}
