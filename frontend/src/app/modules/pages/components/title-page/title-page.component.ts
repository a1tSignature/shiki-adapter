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

  public activeLists: Map<ListType, boolean> = new Map<ListType, boolean>();

  constructor(
    private httpClient: HttpClient,
    private titleService: TitleService,
    private activatedRoute: ActivatedRoute,
    public accountService: AccountService,
    public selectListService: SelectListService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => this.titleService.get(parseInt(params.get(`id`) ?? ``))),
    ).subscribe((title) => {
      this.title = title;
      this.fillActiveLists(title);
    });

  }

  toggleTitle(title: TitleInfo, type: ListType): void {
    console.log(this.activeLists);
  }

  fillActiveLists(title: TitleInfo) {
    this.selectListService.getAllLists().subscribe((item) => {
      item.map((list) => {
        console.log(list);
        this.activeLists.set(
          ListTagReverse[list.name],
          !!list.titles.find((item) => item.shikimoriId === title.id,
          ),
        );
      });
    });
  }
}
