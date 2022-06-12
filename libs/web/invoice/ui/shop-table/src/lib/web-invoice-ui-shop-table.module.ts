import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopTableComponent } from './shop-table/shop-table.component';
import { ShopModalComponent } from './shop-modal/shop-modal.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebSharedUiModule } from '@my-app/web/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    WebSharedUiModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ShopTableComponent,
    ShopModalComponent,
    ConfirmDeleteComponent
  ],
  exports: [
    ShopTableComponent,
    ShopModalComponent,
    ConfirmDeleteComponent
  ],
})
export class WebInvoiceUiShopTableModule {}
