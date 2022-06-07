import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";
import { Metrika } from "ng-yandex-metrika";

@Component({
  selector: `app-search-page`,
  templateUrl: `./search-page.component.html`,
  styleUrls: [`./search-page.component.scss`],
})
export class SearchPageComponent implements OnInit {
  public readonly searchResults$: Observable<Maybe<TitleInfo[]>>;
  private _searchResults = new BehaviorSubject<Maybe<TitleInfo[]>>(null);

  constructor(private metrika: Metrika) {
    this.searchResults$ = this._searchResults.asObservable();
  }

  ngOnInit(): void {
    this.metrika.fireEvent(`search_page_loaded`);
  }


  onSearchResults(event: Maybe<TitleInfo[]>): void {
    this.metrika.fireEvent(`search_field_used`);
    this._searchResults.next(event);
  }
}
