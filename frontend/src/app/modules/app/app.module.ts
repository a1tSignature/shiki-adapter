import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderModule } from "../header/header.module";
import { PagesModule } from "#modules/pages/pages.module";
import { HttpClientModule } from "@angular/common/http";
import { FooterModule } from "#modules/footer/footer.module";
import { SearchModule } from "#modules/search/search.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    PagesModule,
    SearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
