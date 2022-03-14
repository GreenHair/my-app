import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleFormRowComponent } from './article-form-row/article-form-row.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    ArticleFormComponent,
    ArticleFormRowComponent
  ],
  exports: [ArticleFormComponent, ArticleFormRowComponent]
})
export class WebInvoiceUiArticleFormModule {}
