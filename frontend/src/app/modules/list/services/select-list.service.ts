import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from "rxjs";
import { ListType } from "#models/list/list-type";
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";

@Injectable({
  providedIn: `root`,
})
export class SelectListService {
  public selectedType$: Observable<ListType>;
  public selectedList$: Observable<Maybe<TitleInfo[]>>;
  private selectedType = new BehaviorSubject<ListType>(ListType.WATCHING);

  constructor() {
    this.selectedType$ = this.selectedType.asObservable();
    this.selectedList$ = this.selectedType$.pipe(
      switchMap(this.fetchList),
    );
  }

  selectList(type: ListType): void {
    this.selectedType.next(type);
  }

  private fetchList = (type: ListType): Observable<Maybe<TitleInfo[]>> => {
    return of([]);
  };

}
