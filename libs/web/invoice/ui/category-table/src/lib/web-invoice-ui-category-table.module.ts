import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryTableRowComponent } from './category-table-row/category-table-row.component';
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
    CategoryTableRowComponent
  ],
  exports: [
    CategoryTableComponent,
    CategoryTableRowComponent
  ],
})
export class WebInvoiceUiCategoryTableModule {}
