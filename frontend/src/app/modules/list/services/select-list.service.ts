import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { ListTag, ListType } from "#models/list/list-type";
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";
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
    );
  }

  selectList(type: ListType): void {
    this.selectedType.next(type);
  }

  private fetchList = (type: ListType): Observable<Maybe<TitleInfo[]>> => {
    return this.accountService.userInfo$.pipe(
      switchMap((user) =>
        this.httpClient.post<Maybe<TitleInfo[]>>(
          this.settingsService.appSettings.apiEndpoint + `/title-list/${ListTag[type]}?token=${user.accessToken}`,
          {},
        ),
      ),
    );
  };

}
