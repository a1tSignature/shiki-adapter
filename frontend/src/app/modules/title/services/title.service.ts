import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TitleInfo } from "#models/title/title-info";
import { Observable } from "rxjs";
import { Maybe } from "#types/maybe";
import { SHIKIMORI_URL } from "#src/app/common/constants/constants";
import { formatTitleListParams } from "#src/app/common/util/rxjs/operators/format-title-list-params";

@Injectable({
  providedIn: `root`,
})
export class TitleService {
  private readonly apiUrl = `${SHIKIMORI_URL}/api/animes?limit=50&order=ranked&kind=tv`;

  constructor(
    private httpClient: HttpClient,
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
}
