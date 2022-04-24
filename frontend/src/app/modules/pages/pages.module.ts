import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleModule } from "#modules/title/title.module";
import { FooterModule } from "#modules/footer/footer.module";
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchModule } from "#modules/search/search.module";
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LogoutPageComponent } from './components/logout-page/logout-page.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { PlayerModule } from "#modules/player/player.module";


@NgModule({
  declarations: [
    MainPageComponent,
    NotFoundComponent,
    SearchPageComponent,
    LoginPageComponent,
    LogoutPageComponent,
    TitlePageComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    FooterModule,
    SearchModule,
    PlayerModule,
  ],
})
export class PagesModule {}
