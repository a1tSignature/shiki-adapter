import { Component, OnInit } from '@angular/core';
import { AccountService } from "#modules/login/services/account.service";
import { Router } from "@angular/router";

@Component({
  selector: `app-logout-page`,
  templateUrl: `./logout-page.component.html`,
  styleUrls: [`./logout-page.component.scss`],
})
export class LogoutPageComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.accountService.logout();
    this.router.navigateByUrl(`/home`);
  }

}
