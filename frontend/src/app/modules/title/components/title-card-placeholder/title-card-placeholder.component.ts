import { Component, Input } from '@angular/core';

@Component({
  selector: `app-title-card-placeholder`,
  templateUrl: `./title-card-placeholder.component.html`,
  styleUrls: [`../title-card/title-card.component.scss`],
})
export class TitleCardPlaceholderComponent {
  @Input() public invisible = false;

  constructor() { }

}
