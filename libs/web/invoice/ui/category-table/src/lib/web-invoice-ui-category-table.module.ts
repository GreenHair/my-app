import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTableComponent } from './category-table/category-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebSharedUiModule } from '@my-app/web/shared/ui';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

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
    ConfirmDeleteComponent,
  ],
  exports: [
    CategoryTableComponent,
    CategoryModalComponent,
    ConfirmDeleteComponent,
  ],
})
export class WebInvoiceUiCategoryTableModule {}
