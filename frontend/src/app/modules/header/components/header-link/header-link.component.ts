import { Component, Input } from '@angular/core';
import { HeaderLinkIcon, IconNameToIconSrc } from "../../models/header-link-icon";
import { Maybe } from "#types/maybe";

@Component({
  selector: `app-header-link[icon]`,
  templateUrl: `./header-link.component.html`,
  styleUrls: [`./header-link.component.scss`],
})
export class HeaderLinkComponent {
  @Input() public href: Maybe<string> = null;

  @Input()
  public set icon(prop: HeaderLinkIcon) {
    this.iconSrc = IconNameToIconSrc[prop];
  };

  public active: boolean = false;
  public iconSrc!: string;
}
