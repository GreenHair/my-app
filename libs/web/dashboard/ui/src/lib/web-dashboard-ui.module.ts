import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { SumPipe, SumPipeModule } from '@my-app/web/shared/utils';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SumPipeModule,
    RouterModule,
  ],
  declarations: [
    InvoiceListComponent
  ],
  exports: [
    InvoiceListComponent
  ],
  providers: [
    SumPipe
  ]
})
export class WebDashboardUiModule {}
