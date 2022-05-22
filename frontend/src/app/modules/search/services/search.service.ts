import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";
import { HttpClient } from "@angular/common/http";
import { SHIKIMORI_URL } from "#src/app/common/constants/constants";
import { formatTitleListParams } from "#src/app/common/util/rxjs/operators/format-title-list-params";

export type SearchOrder = `id` | `ranked` | `kind` | `popularity` | `name` | `aired_on` | `episodes` | `status`;

export type SearchRating = `none` | `g` | `pg` | `pg_13` | `r` | `r_plus` | `rx`;

export type SearchParam<T extends string> = T | `!${T}`;

export type SearchOption<T extends string> = SearchParam<T> | Array<SearchParam<T>>;

export interface SearchOptions {
  search?: string;
  page?: number;
  limit?: number;
  order?: SearchOption<SearchOrder>;
  kind?: SearchOption<TitleInfo[`kind`]>;
  status?: SearchOption<TitleInfo[`status`]>;
  rating?: SearchOption<SearchRating>;
}

export const NoAgedContentRating: SearchOption<SearchRating> = [`!rx`];

export const AgedContentRating: SearchOption<SearchRating> = [];


export const DefaultSearchOptions: SearchOptions = {
  page: 1,
  limit: 50,
  rating: NoAgedContentRating,
};

@Injectable({
  providedIn: `root`,
})
export class SearchService {
  private readonly apiUrl = `${SHIKIMORI_URL}/api/animes`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  search(options: SearchOptions = DefaultSearchOptions): Observable<Maybe<TitleInfo[]>> {
    options = {
      ...DefaultSearchOptions,
      ...options,
    };

    const url = this.buildUrl(options);
    return this.httpClient.get<TitleInfo[]>(url.toString()).pipe(
      formatTitleListParams(),
    );
  }

  private buildUrl(options: SearchOptions): string {
    const url = new URL(this.apiUrl);

    Object.entries(options).map(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        url.searchParams.set(key, value.join(`,`));
        return;
      }

      url.searchParams.set(key, value);
    });

    return url.toString();
  }
}
