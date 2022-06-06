import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { TitleService } from "#modules/title/services/title.service";
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";
import { AccountService } from "#modules/login/services/account.service";
import { UserRole } from "#models/user/role/user-role";
import { ListTagReverse, ListType, ListTypeUpdatable } from '#src/app/common/models/list/list-type';
import { SelectListService } from "#modules/list/services/select-list.service";
import { Metrika } from "ng-yandex-metrika";

@Component({
  selector: `app-title-page`,
  templateUrl: `./title-page.component.html`,
  styleUrls: [`./title-page.component.scss`],
})
export class TitlePageComponent implements OnInit {
  public readonly UserRole = UserRole;
  public readonly ListType = ListType;
  public readonly ListTypeUpdatable = ListTypeUpdatable;
  public title: Maybe<TitleInfo> = null;

  public activeLists: Map<ListTypeUpdatable, boolean> = new Map<ListTypeUpdatable, boolean>();

  constructor(
    private httpClient: HttpClient,
    private titleService: TitleService,
    private activatedRoute: ActivatedRoute,
    public accountService: AccountService,
    public selectListService: SelectListService,
    private metrika: Metrika,
  ) { }

  ngOnInit(): void {
    this.metrika.fireEvent(`anime_page_loaded`);
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => this.titleService.get(parseInt(params.get(`id`) ?? ``))),
    ).subscribe((title) => {
      this.title = title;
      this.fillActiveLists(title);
    });

  }

  toggleTitle(title: TitleInfo, type: ListTypeUpdatable): void {
    this.fillActiveLists(title);

    if (this.activeLists.get(type as any)) {
      this.selectListService.removeTitleFromList(title, type, () => this.fillActiveLists(title));
    } else {
      for (const item of this.activeLists.keys()) {
        if (this.activeLists.get(item)) {
          this.selectListService.removeTitleFromList(title, item, () => {});
        }
      }
      this.selectListService.addTitleToList(title, type, () => this.fillActiveLists(title));
    }
  }

  fillActiveLists(title: TitleInfo) {
    this.selectListService.getAllLists().subscribe((item) => {
      item.map((list) => {
        this.activeLists.set(
          ListTagReverse[list.name] as any,
          !!list.titles.find((item) => item.shikimoriId === title.id,
          ),
        );
      });
    });
  }
}
