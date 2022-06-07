import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "#services/settings.service";
import { UserRole } from "#models/user/role/user-role";

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

  public moderators: Array<Moderator> = [];

  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.httpClient.get<any>(
      this.settingsService.appSettings.apiEndpoint + `/admin/all-moderators`,
    ).subscribe((moderators) => {
      this.moderators = moderators;
      console.log(moderators);
    });
  }

  create(): void {
    this.httpClient.post<any>(
      this.settingsService.appSettings.apiEndpoint + `/admin/create`,
      {
        username: this.username,
        password: this.password,
        role: UserRole.MODERATOR,
      },
    ).subscribe((response) => {
      console.log(response);
    });
  }

  remove(username: string): void {
    this.httpClient.delete<any>(
      this.settingsService.appSettings.apiEndpoint + `/admin/${username}/delete`,
    ).subscribe((response) => {
      console.log(response);
    });
  }

}
