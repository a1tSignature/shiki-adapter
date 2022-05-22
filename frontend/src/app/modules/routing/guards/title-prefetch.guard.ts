import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { SHIKIMORI_URL } from "#src/app/common/constants/constants";
import { TitleInfo } from "#models/title/title-info";
import { RecentTitlesService } from "#modules/title/services/recent-titles.service";
import { formatTitleParams } from "#src/app/common/util/rxjs/operators/format-title-params";

export interface PrefetchGuardData {
  url: string
}

@Injectable({
  providedIn: `root`,
})
export class TitlePrefetchGuard implements CanActivate {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private recentTitlesService: RecentTitlesService,
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = `${SHIKIMORI_URL}/api/animes/${route.params[`id`]}`;

    if (!url)
      return true;

    return this.httpClient.get<TitleInfo>(url).pipe(
      formatTitleParams(),
      map((title) => {
        this.recentTitlesService.push(title);
        return true;
      }),
      catchError(() => {
        return of(this.router.parseUrl(`/`));
      }),
    );
  }

}
