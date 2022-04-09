import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    MainPageComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class PagesModule {}
