import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms';
import { WebInvoiceUiArticleFormModule } from 'libs/web/invoice/ui/article-form/src';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([
     {path: '', pathMatch: 'full', component: InvoiceComponent}
    ]),
    ReactiveFormsModule,
    WebInvoiceUiArticleFormModule,
  ],
  declarations: [
    InvoiceComponent
  ],
})
export class WebInvoiceFeatureModule {}
