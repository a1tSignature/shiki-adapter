import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlesListComponent } from './components/titles-list/titles-list.component';
import { TitleCardComponent } from './components/title-card/title-card.component';


@NgModule({
  declarations: [
    TitlesListComponent,
    TitleCardComponent,
  ],
  exports: [
    TitlesListComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class TitleModule {}
