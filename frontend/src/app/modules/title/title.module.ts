import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlesListComponent } from './components/titles-list/titles-list.component';
import { TitleCardComponent } from './components/title-card/title-card.component';
import { TitleCardPlaceholderComponent } from './components/title-card-placeholder/title-card-placeholder.component';


@NgModule({
  declarations: [
    TitlesListComponent,
    TitleCardComponent,
    TitleCardPlaceholderComponent,
  ],
  exports: [
    TitlesListComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class TitleModule {}
