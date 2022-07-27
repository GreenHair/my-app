import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleFormRowComponent } from './article-form-row/article-form-row.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebSharedUiModule } from '@my-app/web/shared/ui';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NgbModule,
    WebSharedUiModule,
  ],
  declarations: [
    ArticleFormComponent,
    ArticleFormRowComponent
  ],
  exports: [ArticleFormComponent, ArticleFormRowComponent]
})
export class WebInvoiceUiArticleFormModule {}
