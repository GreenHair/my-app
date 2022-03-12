import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleFormRowComponent } from './article-form-row/article-form-row.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ArticleFormComponent,
    ArticleFormRowComponent
  ],
  exports: [ArticleFormComponent]
})
export class WebInvoiceUiArticleFormModule {}
