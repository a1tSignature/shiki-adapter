import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderLinkComponent } from './components/header-link/header-link.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HeaderLinkComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule {}
