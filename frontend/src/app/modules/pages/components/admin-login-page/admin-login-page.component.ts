import { Component } from '@angular/core';
import { AccountService } from "#modules/login/services/account.service";
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "#services/settings.service";

@Component({
  selector: `app-admin-login-page`,
  templateUrl: `./admin-login-page.component.html`,
  styleUrls: [`./admin-login-page.component.scss`],
})
export class AdminLoginPageComponent {
  public username: string;
  public password: string;
  public message: string;

  constructor(
    private settingsService: SettingsService,
    private accountService: AccountService,
    private httpClient: HttpClient,
  ) { }

  login(): void {
    this.httpClient.post<any>(
      this.settingsService.appSettings.apiEndpoint + `/auth/login`,
      {
        username: this.username,
        password: this.password,
      },
    )
      .subscribe({
          next:
            (data) => {
              console.log(data);
              this.accountService.authorizeModeratorOrAdmin(data.token);
              window.location.reload();
            },
          error: (error) => {
            console.log(error.error);
            if (error.error === `MODERATOR_WAS_NOT_FOUND`) {
              this.message = `Такого модератора нет`;
              return;
            }

            this.message = error.error;
          },
        },
      );

  }
}
