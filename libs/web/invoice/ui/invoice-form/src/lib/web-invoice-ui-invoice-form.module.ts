import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleFormRowComponent } from '../../../article-form/src/lib/article-form-row/article-form-row.component';
import { WebInvoiceUiArticleFormModule } from '../../../article-form/src/lib/web-invoice-ui-article-form.module';
import { WebSharedUiModule } from '@my-app/web/shared/ui';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    WebInvoiceUiArticleFormModule,
    WebSharedUiModule,
  ],
  declarations: [
    InvoiceFormComponent
  ],
  exports: [
    InvoiceFormComponent
  ],
})
export class WebInvoiceUiInvoiceFormModule {}
