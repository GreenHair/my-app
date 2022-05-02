import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    InvoiceListComponent
  ],
  exports: [
    InvoiceListComponent
  ],
})
export class WebDashboardUiModule {}
