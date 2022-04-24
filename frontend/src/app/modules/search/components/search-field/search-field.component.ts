import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { TitleInfo } from "#models/title/title-info";
import { Maybe } from "#types/maybe";
import { DefaultSearchOptions, SearchOptions, SearchService } from "#modules/search/services/search.service";
import { BehaviorSubject, catchError, debounceTime, filter, of, Subject, switchMap } from "rxjs";

@Component({
  selector: `app-search-field[searchResults]`,
  templateUrl: `./search-field.component.html`,
  styleUrls: [`./search-field.component.scss`],
})
export class SearchFieldComponent implements OnDestroy {
  @Input() public debounceTime = 300;
  @Output() public readonly searchResults = new EventEmitter<Maybe<TitleInfo[]>>();

  private options$ = new BehaviorSubject<SearchOptions>(DefaultSearchOptions);
  private readonly destroy$ = new Subject();

  constructor(
    private searchService: SearchService,
  ) {
    this.options$
      .pipe(
        debounceTime(this.debounceTime),
        filter(Boolean),
        switchMap((query) => this.searchService.search(query)),
        catchError(() => of(null)),
      )
      .subscribe((searchResults) => {
        this.searchResults.emit(searchResults);
      });
  }

  onKeyup(search: string): void {
    this.performSearch({ search });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private performSearch(changedValues: Partial<SearchOptions>): void {
    this.options$.next({
      ...this.options$.getValue(),
      ...changedValues,
    });
  }
}
