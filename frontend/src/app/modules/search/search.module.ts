import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from './components/search-field/search-field.component';


@NgModule({
  declarations: [
    SearchFieldComponent,
  ],
  exports: [
    SearchFieldComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class SearchModule {}
