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
  }

  authorizeUser(authResponse: AuthResponse): void {
    this.userInfo.next({
      userRole: UserRole.USER,
      accessToken: authResponse.access_token,
    });
    localStorage.setItem(`__userRole`, UserRole.USER);
    localStorage.setItem(`__authResponse`, JSON.stringify(authResponse));
  }
}
