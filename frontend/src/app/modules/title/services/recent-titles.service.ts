import { Injectable } from '@angular/core';
import { TitleInfo } from "#models/title/title-info";
import { Maybe } from "#types/maybe";
import { BehaviorSubject, Observable } from "rxjs";

export interface RecentTitle extends TitleInfo {}

@Injectable({
  providedIn: `root`,
})
export class RecentTitlesService {
  private static readonly LIMIT = 10;
  private static readonly LS_KEY = `__recentTitles`;

  private static save(titles: Array<RecentTitle>): void {
    localStorage.setItem(RecentTitlesService.LS_KEY, JSON.stringify(titles));
  }

  private static load(): Maybe<Array<RecentTitle>> {
    const lsEntry = localStorage.getItem(RecentTitlesService.LS_KEY);

    if (!lsEntry)
      return null;

    try {
      return JSON.parse(lsEntry);
    } catch (e) {
      console.error(`Corrupted localStorage entry. JSON parse error: `, e);
      return null;
    }
  }

  public get recentTitles(): Maybe<TitleInfo[]> {
    return RecentTitlesService.load();
  }

  public readonly recentTitles$: Observable<Maybe<TitleInfo[]>>;
  private _recentTitles = new BehaviorSubject<Maybe<TitleInfo[]>>(null);

  constructor() {
    this.recentTitles$ = this._recentTitles.asObservable();
    this.updateRecentTitles();
  }

  push(title: RecentTitle): void {
    const previous = RecentTitlesService.load() || [];
    let actual: RecentTitle[];

    actual = [
      title,
      ...previous.filter(
        (item: RecentTitle) => item.id !== title.id,
      ),
    ];

    if (actual.length > RecentTitlesService.LIMIT)
      actual.length = RecentTitlesService.LIMIT;

    RecentTitlesService.save(actual);
    this.updateRecentTitles();
  }

  private updateRecentTitles(): void {
    this._recentTitles.next(this.recentTitles);
  }

}
