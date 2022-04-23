import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TitleInfo } from "#models/title/title-info";
import { Maybe } from "#types/maybe";
import { BehaviorSubject, isObservable, Observable, Subject, takeUntil } from "rxjs";
import { indicate } from "#src/app/common/util/rxjs/operators/indicate";

@Component({
  selector: `app-title-card[title]`,
  templateUrl: `./title-card.component.html`,
  styleUrls: [`./title-card.component.scss`],
})
export class TitleCardComponent implements OnInit, OnDestroy {
  @Input() public title!: Observable<Maybe<TitleInfo>> | Maybe<TitleInfo>;
  public readonly loading$ = new BehaviorSubject(false);
  public readonly failed$ = new BehaviorSubject(false);
  public loadedTitle$ = new BehaviorSubject<Maybe<TitleInfo>>(null);

  public link: Maybe<string> = null;

  private readonly destroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    if (isObservable(this.title)) {
      this.title.pipe(
        indicate(this.loading$),
        takeUntil(this.destroy$),
      ).subscribe(this.onTitleLoaded);
      return;
    }

    this.onTitleLoaded(this.title);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private onTitleLoaded = (title: Maybe<TitleInfo>): void => {
    if (title === null) {
      this.failed$.next(true);
      return;
    }

    this.link = `/anime/${title.id}`;
    this.loadedTitle$.next(title);
  };
}
