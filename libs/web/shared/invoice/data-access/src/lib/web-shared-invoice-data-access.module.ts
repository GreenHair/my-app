import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from './invoice.service';

@NgModule({
  imports: [CommonModule],
  providers: [InvoiceService]
})
export class WebSharedInvoiceDataAccessModule {}
