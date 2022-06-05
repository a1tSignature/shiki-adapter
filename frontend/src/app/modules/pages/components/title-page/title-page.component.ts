import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { TitleService } from "#modules/title/services/title.service";
import { Maybe } from "#types/maybe";
import { TitleInfo } from "#models/title/title-info";

@Component({
  selector: `app-title-page`,
  templateUrl: `./title-page.component.html`,
  styleUrls: [`./title-page.component.scss`],
})
export class TitlePageComponent implements OnInit {
  public title: Maybe<TitleInfo> = null;

  constructor(
    private httpClient: HttpClient,
    private titleService: TitleService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => this.titleService.get(parseInt(params.get(`id`) ?? ``))),
    ).subscribe((title) => {
      this.title = title;
    });

  }


}
