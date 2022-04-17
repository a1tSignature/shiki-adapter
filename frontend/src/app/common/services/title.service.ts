import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TitleInfo } from "#models/title/title-info";
import { map, Observable } from "rxjs";
import { ShikimoriAnimesDto } from "#src/app/common/dto/shikimori/shikimori-animes.dto";
import { Maybe } from "#types/maybe";

@Injectable({
  providedIn: `root`,
})
export class TitleService {
  private readonly apiUrl = `https://shikimori.one/api/animes?limit=50&order=ranked&kind=tv`;

  constructor(
    private httpClient: HttpClient,
  ) {}

  // todo discuss with Vadim and remove
  /**
   * Loading - nothing,
   * Error - null,
   * Ok - TitleInfo[]
   * */
  getMockTitles(): Observable<Maybe<TitleInfo[]>> {
    return this.httpClient
      .get<ShikimoriAnimesDto>(this.apiUrl)
      .pipe(
        map(
          (response) => {
            return response.map((item) => ({
                id: item.id,
                name: item.name,
                image: `https://desu.shikimori.one${item.image.original}`,
                status: item.status,
              }),
            );
          }),
      );
  }
}
