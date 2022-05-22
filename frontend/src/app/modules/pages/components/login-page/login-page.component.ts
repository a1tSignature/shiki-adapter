import { Component } from '@angular/core';
import { LoginService } from "#modules/login/services/login.service";

@Component({
  selector: `app-login-page`,
  templateUrl: `./login-page.component.html`,
  styleUrls: [`./login-page.component.scss`],
})
export class LoginPageComponent {

  constructor(
    public loginService: LoginService,
  ) { }

  login(): void {
    this.loginService.receiveAuthorizationToken();
  }
}
