import { Injectable } from '@angular/core';
import { SettingsService } from "#services/settings.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: `root`,
})
export class LoginService {
  private static buildApiUrl(clientID: string, redirectURI?: string): URL {
    const apiUrl = new URL(`https://shikimori.one/oauth/authorize`);
    apiUrl.searchParams.set(`client_id`, clientID);
    apiUrl.searchParams.set(`response_type`, `code`);

    if (redirectURI)
      apiUrl.searchParams.set(`redirect_url`, redirectURI);

    return apiUrl;
  }

  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
  ) {
    LoginService.buildApiUrl(settingsService.appSettings.shikimoriAppClientID);
  }

  login(): void {
    // todo login through api url https://shikimori.one/oauth?oauth_application_id=622#step_2
    // todo window.opener.location.reload();
  }
}
