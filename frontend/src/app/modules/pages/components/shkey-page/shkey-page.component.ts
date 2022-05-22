import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: `app-shkey-page`,
  template: ``,
})
export class ShkeyPageComponent implements OnInit {
  public static readonly BROADCAST_CHANNEL = `__shkey`;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params[`code`]) {
        const channel = new BroadcastChannel(ShkeyPageComponent.BROADCAST_CHANNEL);
        channel.postMessage(params[`code`]);
      }
      window.close();
    });

  }

}
