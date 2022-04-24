import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { SHIKIMORI_URL } from "#src/app/common/constants/constants";

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
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = `${SHIKIMORI_URL}/api/animes/${route.params[`id`]}`;

    if (!url)
      return true;

    return this.httpClient.head<never>(url).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(this.router.parseUrl(`/`));
      }),
    );
  }

}
