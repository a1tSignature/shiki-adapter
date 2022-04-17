import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleModule } from "#modules/title/title.module";
import { FooterModule } from "#modules/footer/footer.module";


@NgModule({
  declarations: [
    MainPageComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    FooterModule,
  ],
})
export class PagesModule {}
