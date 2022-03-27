import { Component, Input } from '@angular/core';
import { HeaderLinkIcon, IconNameToIconSrc } from "../../models/header-link-icon";

@Component({
  selector: `app-header-link[href][icon]`,
  templateUrl: `./header-link.component.html`,
  styleUrls: [`./header-link.component.scss`],
})
export class HeaderLinkComponent {
  @Input() public href!: string;

  @Input()
  public set icon(prop: HeaderLinkIcon) {
    this.iconSrc = IconNameToIconSrc[prop];
  };

  @Input() public active: boolean = false;
  public iconSrc!: string;
}
