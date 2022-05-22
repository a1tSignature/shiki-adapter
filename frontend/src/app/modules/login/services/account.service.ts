import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DefaultUserInfo, UserInfo } from "#models/user/user-info";
import { UserRole } from "#models/user/role/user-role";

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
    if (localStorage.getItem(`__mockAuthorized`) === UserRole.USER) {
      this.mockAuthorizeUser();
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
    localStorage.removeItem(`__mockAuthorized`);
  }

  mockAuthorizeUser(): void {
    this.userInfo.next({
      userRole: UserRole.USER,
    });
    localStorage.setItem(`__mockAuthorized`, UserRole.USER);
  }
}
