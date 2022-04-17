import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import { indicate } from "#src/app/common/util/rxjs/operators/indicate";

export type TitlesListOrientation = `vertical` | `horizontal`;

@Component({
  selector: `app-titles-list[titles]`,
  templateUrl: `./titles-list.component.html`,
  styleUrls: [`./titles-list.component.scss`],
})
export class TitlesListComponent implements OnInit, OnDestroy {
  /*
   * Request observable
   * Keep in mind that when using a subscription from a http-request, this would trigger the request twice.
   * So you should use some state-management pattern or library, to not make that happen.
   *
   * (if using useIndicator)
   * */
  @Input() public titles!: Observable<Maybe<TitleInfo[]>>;
  @Input() public label: Maybe<string> = null;
  @Input() public orientation: TitlesListOrientation = `horizontal`;

  public readonly loading$ = new BehaviorSubject(false);
  public readonly failed$ = new BehaviorSubject(false);
  public loadedTitles$ = new BehaviorSubject<Maybe<TitleInfo[]>>(null);

  private readonly destroy$ = new Subject();


  constructor() { }

  ngOnInit(): void {
    this.titles.pipe(
      indicate(this.loading$),
      takeUntil(this.destroy$),
    ).subscribe(this.onTitlesLoaded);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private onTitlesLoaded = (titles: Maybe<TitleInfo[]>): void => {
    if (titles === null) {
      this.failed$.next(true);
      return;
    }

    this.loadedTitles$.next(titles);
  };
}
