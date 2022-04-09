import { Component, OnDestroy } from '@angular/core';
import { AccountService } from "#src/app/common/services/account.service";
import { UserRole } from '#src/app/common/models/user/role/user-role';
import { Subject, takeUntil } from "rxjs";
import { RouteToRole } from "#modules/routing/models/route-to-role";
import { AppRoute } from "#modules/routing/models/app-route";

@Component({
  selector: `app-header`,
  templateUrl: `./header.component.html`,
  styleUrls: [`./header.component.scss`],
})
export class HeaderComponent implements OnDestroy {
  private readonly destroy$ = new Subject();

  private userRole = UserRole.GUEST;

  constructor(
    public accountService: AccountService,
  ) {
    accountService.userInfo$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((userInfo) => {
      this.userRole = userInfo.userRole;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  routeAccessible(route: AppRoute): boolean {
    return RouteToRole[route].includes(this.userRole);
  }
}
