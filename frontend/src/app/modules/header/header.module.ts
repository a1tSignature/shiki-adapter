import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderLinkComponent } from './components/header-link/header-link.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    HeaderComponent,
    HeaderLinkComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule {}
