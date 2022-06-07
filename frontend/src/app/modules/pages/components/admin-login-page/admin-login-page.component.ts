import { Component } from '@angular/core';
import { AccountService } from "#modules/login/services/account.service";

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
    private accountService: AccountService,
  ) { }

  login(): void {
    console.log(`-@@@`, this.username, this.password);
    // todo send request to backend, get jwt
    this.accountService.authorizeAdmin();
    window.location.reload();
  }
}
