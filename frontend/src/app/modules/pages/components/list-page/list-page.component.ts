import { Component } from '@angular/core';
import { SelectListService } from "#modules/list/services/select-list.service";

@Component({
  selector: `app-list-page`,
  templateUrl: `./list-page.component.html`,
  styleUrls: [`./list-page.component.scss`],
})
export class ListPageComponent {

  constructor(
    public selectListService: SelectListService,
  ) {
  }

}
