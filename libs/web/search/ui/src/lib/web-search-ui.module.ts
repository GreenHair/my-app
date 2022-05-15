import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    SearchFormComponent,
    SearchResultComponent
  ],
  exports: [
    SearchFormComponent,
    SearchResultComponent
  ],
})
export class WebSearchUiModule {}
