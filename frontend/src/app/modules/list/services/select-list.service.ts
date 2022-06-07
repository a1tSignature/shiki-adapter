import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from "rxjs";
import { ListTag, ListType, ListTypeUpdatable } from "#models/list/list-type";
import { Maybe } from "#types/maybe";
import { TitleInfo, titleInfoConvertToSa, TitleInfoSA, titleInfoSaConvertToShiki } from "#models/title/title-info";
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "#services/settings.service";
import { AccountService } from "#modules/login/services/account.service";

@Injectable({
  providedIn: `root`,
})
export class SelectListService {
  public selectedType$: Observable<ListType>;
  public selectedList$: Observable<Maybe<TitleInfo[]>>;
  private selectedType = new BehaviorSubject<ListType>(ListType.WATCHING);

  constructor(
    private accountService: AccountService,
    private settingsService: SettingsService,
    private httpClient: HttpClient,
  ) {
    this.selectedType$ = this.selectedType.asObservable();
    this.selectedList$ = this.selectedType$.pipe(
      switchMap(this.fetchList),
      map((item: any) => item.titles.map((title) => titleInfoSaConvertToShiki(title))),
    ) as any;
  }

  selectList(type: ListType): void {
    this.selectedType.next(type);
  }

  getAllLists(): Observable<any> {
    return this.accountService.userInfo$.pipe(
      switchMap((user) =>
        this.httpClient.get<any>(
          this.settingsService.appSettings.apiEndpoint + `/title-list/fetch/all-lists?token=${user.accessToken}`,
        ),
      ),
    );
  }

  addTitleToList(title: TitleInfo | null, listType: ListTypeUpdatable, callback): void {
    if (!title) {
      console.log(`No title cannot add`);
      return;
    }

    this.accountService.userInfo$.pipe(
      switchMap((user) =>
        this.httpClient.post(
          this.settingsService.appSettings.apiEndpoint + `/title-list/${ListTag[listType]}/add?token=${user.accessToken}`,
          { ...titleInfoConvertToSa(title) },
        ),
      ),
    ).subscribe(callback);
  }

  removeTitleFromList(title: TitleInfo, listType: ListTypeUpdatable, callback): void {
    this.accountService.userInfo$.pipe(
      switchMap((user) =>
        this.httpClient.post(
          this.settingsService.appSettings.apiEndpoint + `/title-list/${ListTag[listType]}/remove?token=${user.accessToken}`,
          { ...titleInfoConvertToSa(title) },
        ),
      ),
    ).subscribe(callback);
  }

  public fetchList = (type: ListType): Observable<Maybe<TitleInfoSA[]>> => {
    return this.accountService.userInfo$.pipe(
      switchMap((user) => {
          if (type === ListType.UPDATES)
            return this.httpClient.post<any>(
              this.settingsService.appSettings.apiEndpoint + `/title-list/${ListTag[ListType.WATCHING]}?token=${user.accessToken}`,
              {},
            ).pipe(
              map((item: any) => {
                item.titles = item.titles.filter((title) => title.status === `ongoing`);
                return item;
              }),
            );

          return this.httpClient.post<Maybe<TitleInfoSA[]>>(
            this.settingsService.appSettings.apiEndpoint + `/title-list/${ListTag[type]}?token=${user.accessToken}`,
            {},
          );
        },
      ),
    );
  };

}
