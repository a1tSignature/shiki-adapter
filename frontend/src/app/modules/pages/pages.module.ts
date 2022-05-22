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
import { FaqPageComponent } from './components/faq-page/faq-page.component';
import { RouterModule } from "@angular/router";
import { ShkeyPageComponent } from './components/shkey-page/shkey-page.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { ListModule } from "#modules/list/list.module";


@NgModule({
  declarations: [
    MainPageComponent,
    NotFoundComponent,
    SearchPageComponent,
    LoginPageComponent,
    LogoutPageComponent,
    TitlePageComponent,
    FaqPageComponent,
    ShkeyPageComponent,
    ListPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TitleModule,
    FooterModule,
    SearchModule,
    PlayerModule,
    ListModule,
  ],
})
export class PagesModule {}
