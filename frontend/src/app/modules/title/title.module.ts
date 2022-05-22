import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlesListComponent } from './components/titles-list/titles-list.component';
import { TitleCardComponent } from './components/title-card/title-card.component';
import { TitleCardPlaceholderComponent } from './components/title-card-placeholder/title-card-placeholder.component';
import { RouterModule } from "@angular/router";
import { TitlesListRecentComponent } from './components/titles-list-recent/titles-list-recent.component';
import { TitlesListUpdatesComponent } from './components/titles-list-updates/titles-list-updates.component';
import { TitlesListOngoingsComponent } from './components/titles-list-ongoings/titles-list-ongoings.component';


@NgModule({
  declarations: [
    TitlesListComponent,
    TitleCardComponent,
    TitleCardPlaceholderComponent,
    TitlesListRecentComponent,
    TitlesListUpdatesComponent,
    TitlesListOngoingsComponent,
  ],
  exports: [
    TitlesListComponent,
    TitlesListRecentComponent,
    TitlesListUpdatesComponent,
    TitlesListOngoingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class TitleModule {}
