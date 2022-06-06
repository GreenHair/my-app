import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTableComponent } from './category-table/category-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebSharedUiModule } from '@my-app/web/shared/ui';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    WebSharedUiModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CategoryTableComponent,
    CategoryModalComponent,
  ],
  exports: [
    CategoryTableComponent,
    CategoryModalComponent,
  ],
})
export class WebInvoiceUiCategoryTableModule {}
