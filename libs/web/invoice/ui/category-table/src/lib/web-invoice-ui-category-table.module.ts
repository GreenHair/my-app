import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTableComponent } from './category-table/category-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebSharedUiModule } from '@my-app/web/shared/ui';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    WebSharedUiModule,
  ],
  declarations: [
    CategoryTableComponent,
  ],
  exports: [
    CategoryTableComponent,
  ],
})
export class WebInvoiceUiCategoryTableModule {}
