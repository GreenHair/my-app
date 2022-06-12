import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms';
import { WebInvoiceUiArticleFormModule } from 'libs/web/invoice/ui/article-form/src';
import { WebInvoiceUiInvoiceFormModule } from 'libs/web/invoice/ui/invoice-form/src';
import { ShopsComponent } from './shops/shops.component';
import { WebInvoiceUiBackButtonModule } from '@my-app/web/invoice/ui/back-button';
import { CategoriesComponent } from './categories/categories.component';
import { WebInvoiceUiCategoryTableModule } from '@my-app/web/invoice/ui/category-table';
import { WebInvoiceUiShopTableModule } from '@my-app/web/invoice/ui/shop-table';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([
     {path: '', pathMatch: 'full', component: InvoiceComponent},
     {
       path: 'shops',
       component: ShopsComponent
     },
     {
       path: 'categories',
       component: CategoriesComponent
     }
    ]),
    ReactiveFormsModule,
    WebInvoiceUiArticleFormModule,
    WebInvoiceUiInvoiceFormModule,
    WebInvoiceUiBackButtonModule,
    WebInvoiceUiCategoryTableModule,
    WebInvoiceUiShopTableModule,
  ],
  declarations: [
    InvoiceComponent,
    ShopsComponent,
    CategoriesComponent
  ],
})
export class WebInvoiceFeatureModule {}
