import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DefaultUserInfo, UserInfo } from "#models/user/user-info";
import { UserRole } from "#models/user/role/user-role";

export interface AuthResponse {
  access_token: string,
  expires_in: 86400,
  refresh_token: string,
  scope: string,
}

@Injectable({
  providedIn: `root`,
})
export class AccountService implements OnDestroy {
  public readonly userInfo$: Observable<UserInfo>;
  private readonly userInfo = new BehaviorSubject<UserInfo>(DefaultUserInfo);
  private readonly destroy$ = new Subject();

  constructor() {
    this.userInfo$ = this.userInfo.asObservable().pipe(
      takeUntil(this.destroy$),
    );
    if (localStorage.getItem(`__userRole`) === UserRole.USER && localStorage.getItem(`__authResponse`)) {
      this.userInfo.next({
        userRole: UserRole.USER,
        accessToken: JSON.parse(localStorage.getItem(`__authResponse`) ?? `{}`).access_token,
      });
    } else if (localStorage.getItem(`__userRole`) === UserRole.MODERATOR || localStorage.getItem(`__userRole`) === UserRole.ADMIN) {
      this.authorizeModeratorOrAdmin(localStorage.getItem(`__jwtToken`));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  logout(): void {
    this.userInfo.next({
      userRole: UserRole.GUEST,
    });
    localStorage.removeItem(`__userRole`);
    localStorage.removeItem(`__authResponse`);
    localStorage.removeItem(`__jwtToken`);
  }

  authorizeUser(authResponse: AuthResponse): void {
    this.userInfo.next({
      userRole: UserRole.USER,
      accessToken: authResponse.access_token,
    });
    localStorage.setItem(`__userRole`, UserRole.USER);
    localStorage.setItem(`__authResponse`, JSON.stringify(authResponse));
  }

  authorizeModeratorOrAdmin(jwt: string) {
    const data = JSON.parse(atob(jwt.split(`.`)[1]));

    this.userInfo.next({
      userRole: data.role,
    });
    localStorage.setItem(`__userRole`, data.role);
    localStorage.setItem(`__jwtToken`, jwt);
  }

  authorizeModerator(): void {
    this.userInfo.next({
      userRole: UserRole.MODERATOR,
    });
    localStorage.setItem(`__userRole`, UserRole.MODERATOR);
  }

  authorizeAdmin(): void {
    this.userInfo.next({
      userRole: UserRole.ADMIN,
    });
    localStorage.setItem(`__userRole`, UserRole.ADMIN);
  }
}
