import { Component, OnInit } from '@angular/core';
import { SelectListService } from "#modules/list/services/select-list.service";
import { Metrika } from "ng-yandex-metrika";

@Component({
  selector: `app-list-page`,
  templateUrl: `./list-page.component.html`,
  styleUrls: [`./list-page.component.scss`],
})
export class ListPageComponent implements OnInit {

  constructor(
    public selectListService: SelectListService,
    private metrika: Metrika,
  ) {
  }

  ngOnInit(): void {
    this.metrika.fireEvent(`lists_page_loaded`);
  }
}
