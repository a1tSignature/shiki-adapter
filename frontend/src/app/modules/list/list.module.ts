import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectListComponent } from './components/select-list/select-list.component';


@NgModule({
  declarations: [
    SelectListComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SelectListComponent,
  ],
})
export class ListModule {}
