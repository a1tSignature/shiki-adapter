import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from "#services/account.service";
import { RouteData } from "#modules/routing/models/route-data";

@Injectable({
  providedIn: `root`,
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const availableRoles = (route.data as RouteData).roles;

    if (!availableRoles)
      return true;

    return this.accountService.userInfo$.pipe(
      map((userInfo) => {
        return availableRoles.includes(userInfo.userRole) || this.router.parseUrl(`/`);
      }),
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
