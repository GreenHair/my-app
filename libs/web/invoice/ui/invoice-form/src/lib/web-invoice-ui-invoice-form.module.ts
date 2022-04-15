import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    InvoiceFormComponent
  ],
  exports: [
    InvoiceFormComponent
  ],
})
export class WebInvoiceUiInvoiceFormModule {}
