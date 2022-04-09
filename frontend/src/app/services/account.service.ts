import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DefaultUserInfo, UserInfo } from "#models/user/user-info";

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
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
