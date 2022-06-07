import { Injectable } from '@angular/core';
import { SettingsService } from "#services/settings.service";
import { ShkeyPageComponent } from "#modules/pages/components/shkey-page/shkey-page.component";
import { AccountService, AuthResponse } from "#modules/login/services/account.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SHIKIMORI_URL } from "#src/app/common/constants/constants";


@Injectable({
  providedIn: `root`,
})
export class LoginService {
  public static readonly LS_KEY = `__shkey`;

  private static buildApiUrl(clientID: string, redirectURI?: string): URL {
    const apiUrl = new URL(`https://shikimori.one/oauth/authorize`);
    apiUrl.searchParams.set(`client_id`, clientID);
    apiUrl.searchParams.set(`response_type`, `code`);
    apiUrl.searchParams.set(`scope`, ``);
    apiUrl.searchParams.set(`redirect_uri`, redirectURI ?? `urn:ietf:wg:oauth:2.0:oob`);

    return apiUrl;
  }

  public requestAuthorizationCodeURL: URL;
  private broadcastChannel = new BroadcastChannel(ShkeyPageComponent.BROADCAST_CHANNEL);

  constructor(
    private settingsService: SettingsService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
  ) {
    this.requestAuthorizationCodeURL = LoginService.buildApiUrl(settingsService.appSettings.shikimoriAppClientID, window.location.origin + `/shkey`);
    this.subscribeOnAuthorizationCodeReceived();
  }

  receiveAuthorizationToken(): void {
    window.open(this.requestAuthorizationCodeURL, `_blank`, `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=500`);
  }

  private subscribeOnAuthorizationCodeReceived(): void {
    this.broadcastChannel.addEventListener(`message`, (event) => {
      const code = event.data;

      const data = new FormData();
      data.append(`grant_type`, `authorization_code`);
      data.append(`client_id`, this.settingsService.appSettings.shikimoriAppClientID);
      data.append(`client_secret`, this.settingsService.appSettings.shikimoriAppClientS);
      data.append(`code`, code);
      data.append(`redirect_uri`, window.location.origin + `/shkey`);

      const headers = new HttpHeaders({ enctype: `multipart/form-data` });

      this.httpClient.post<AuthResponse>(`${SHIKIMORI_URL}/oauth/token`, data, { headers })
        .subscribe((response) => {
          // todo send code to backend and receive session
          this.accountService.authorizeUser(response);
          window.location.reload();
        });
    });


  }
}
