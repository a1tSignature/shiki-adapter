import { ListType } from '#src/app/common/models/list/list-type';
import { Component } from '@angular/core';
import { SelectListService } from "#modules/list/services/select-list.service";

@Component({
  selector: `app-select-list`,
  templateUrl: `./select-list.component.html`,
  styleUrls: [`./select-list.component.scss`],
})
export class SelectListComponent {
  public readonly ListType = ListType;

  constructor(public selectListService: SelectListService) {}

}
