import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SettingsService } from "#services/settings.service";
import { UserRole } from "#models/user/role/user-role";
import { switchMap } from "rxjs";
import { AccountService } from "#modules/login/services/account.service";

export interface Moderator {
  id?: string,
  username: string,
  role: string,
}

@Component({
  selector: `app-admin-panel-page`,
  templateUrl: `./admin-panel-page.component.html`,
  styleUrls: [`./admin-panel-page.component.scss`],
})
export class AdminPanelPageComponent implements OnInit {
  public username: string;
  public password: string;
  public newPassword = {};

  public moderators: Array<Moderator> = [];

  constructor(
    private accountService: AccountService,
    private settingsService: SettingsService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.fetchModerators();

  }

  fetchModerators() {
    this.accountService.userInfo$.pipe(
      switchMap((user) => {
          const headers = new HttpHeaders({ [`Authorization`]: `Bearer ${user.jwtToken}` });
          return this.httpClient.get<any>(
            this.settingsService.appSettings.apiEndpoint + `/admin/all-moderators`,
            { headers },
          );
        },
      ),
    ).subscribe((moderators) => {
      this.moderators = moderators;
      console.log(moderators);
    });
  }

  create(): void {
    this.accountService.userInfo$.pipe(
      switchMap((user) => {
          const headers = new HttpHeaders({ [`Authorization`]: `Bearer ${user.jwtToken}` });
          return this.httpClient.post<any>(
            this.settingsService.appSettings.apiEndpoint + `/admin/create`,
            {
              username: this.username,
              password: this.password,
              role: UserRole.MODERATOR,
            },
            { headers },
          );
        },
      ),
    ).subscribe(() => {
      this.fetchModerators();
    });
  }

  remove(username: string): void {
    this.accountService.userInfo$.pipe(
      switchMap((user) => {
          const headers = new HttpHeaders({ [`Authorization`]: `Bearer ${user.jwtToken}` });
          return this.httpClient.post<any>(
            this.settingsService.appSettings.apiEndpoint + `/admin/${username}/delete`,
            {},
            { headers },
          );
        },
      ),
    ).subscribe(() => {
      this.fetchModerators();
    });
  }

  update(username: string): void {
    if (!this.newPassword[username]) {
      alert(`Введите пароль`);
      return;
    }
    this.accountService.userInfo$.pipe(
      switchMap((user) => {
          const headers = new HttpHeaders({ [`Authorization`]: `Bearer ${user.jwtToken}` });
          return this.httpClient.post<any>(
            this.settingsService.appSettings.apiEndpoint + `/admin/${username}/update`,
            {
              username: username,
              password: this.newPassword[username],
              role: UserRole.MODERATOR,
            },
            { headers },
          );
        },
      ),
    ).subscribe(() => {
      this.fetchModerators();
      delete this.newPassword[username];
    });
  }

}
