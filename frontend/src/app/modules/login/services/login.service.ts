import { Injectable } from '@angular/core';
import { SettingsService } from "#services/settings.service";
import { ShkeyPageComponent } from "#modules/pages/components/shkey-page/shkey-page.component";
import { AccountService } from "#modules/login/services/account.service";
import { ActivatedRoute, Router } from "@angular/router";

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
      // todo send code to backend and receive session
      this.accountService.mockAuthorizeUser();
      window.location.reload();
    });


  }
}
