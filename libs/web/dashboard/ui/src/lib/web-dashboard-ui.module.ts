import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { SumPipe, SumPipeModule } from '@my-app/web/shared/utils';
import { RouterModule } from '@angular/router';
import { QuickInfoComponent } from './quick-info/quick-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SumPipeModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InvoiceListComponent,
    QuickInfoComponent
  ],
  exports: [
    InvoiceListComponent,
    QuickInfoComponent
  ],
  providers: [
    SumPipe
  ]
})
export class WebDashboardUiModule {}
