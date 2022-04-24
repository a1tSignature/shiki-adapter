import { Component } from '@angular/core';
import { of } from "rxjs";

@Component({
  selector: `app-titles-list-updates`,
  templateUrl: `./titles-list-updates.component.html`,
  styleUrls: [`./titles-list-updates.component.scss`],
})
export class TitlesListUpdatesComponent {
  public titles = of([]);

  constructor() { }

}
