import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";

@Component({
  selector: `app-search-page`,
  templateUrl: `./search-page.component.html`,
  styleUrls: [`./search-page.component.scss`],
})
export class SearchPageComponent {
  public readonly searchResults$: Observable<Maybe<TitleInfo[]>>;
  private _searchResults = new BehaviorSubject<Maybe<TitleInfo[]>>(null);

  constructor() {
    this.searchResults$ = this._searchResults.asObservable();
  }

  onSearchResults(event: Maybe<TitleInfo[]>): void {
    this._searchResults.next(event);
  }
}
