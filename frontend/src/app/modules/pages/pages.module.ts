import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleModule } from "#modules/title/title.module";
import { FooterModule } from "#modules/footer/footer.module";
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchModule } from "#modules/search/search.module";


@NgModule({
  declarations: [
    MainPageComponent,
    NotFoundComponent,
    SearchPageComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    FooterModule,
    SearchModule,
  ],
})
export class PagesModule {}
