import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TitleInfo } from "#models/title/title-info";
import { Observable, of } from "rxjs";
import { Maybe } from "#types/maybe";
import { SHIKIMORI_URL } from "#src/app/common/constants/constants";
import { formatTitleListParams } from "#src/app/common/util/rxjs/operators/format-title-list-params";
import { SearchService } from "#modules/search/services/search.service";

@Injectable({
  providedIn: `root`,
})
export class TitleService {
  private readonly apiUrl = `${SHIKIMORI_URL}/api/animes?limit=50&order=ranked&kind=tv`;

  constructor(
    private httpClient: HttpClient,
    private searchService: SearchService,
  ) {}

  /**
   * Loading - nothing,
   * Error - null,
   * Ok - TitleInfo[]
   * */
  getMockTitles(): Observable<Maybe<TitleInfo[]>> {
    return this.httpClient
      .get<TitleInfo[]>(this.apiUrl)
      .pipe(
        formatTitleListParams(),
      );
  }

  ongoings(): Observable<Maybe<TitleInfo[]>> {
    return this.searchService.search({
      order: `popularity`,
      kind: `tv`,
      status: `ongoing`,
      limit: 20,
    });
  }

  updates(): Observable<Maybe<TitleInfo[]>> {
    // todo return real updates
    return of(null);
  }
}
