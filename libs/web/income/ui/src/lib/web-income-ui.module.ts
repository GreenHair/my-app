import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeListComponent } from './income-list/income-list.component';
import { IncomeListItemComponent } from './income-list-item/income-list-item.component';
import { GroupByMonthPipeModule } from '@my-app/web/income/utils';
import { SumPipeModule } from '@my-app/web/shared/utils';
import { IncomeModalComponent } from './income-modal/income-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@NgModule({
  imports: [
    CommonModule,
    GroupByMonthPipeModule,
    SumPipeModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    IncomeListComponent,
    IncomeListItemComponent,
    IncomeModalComponent,
    ConfirmDeleteComponent
  ],
  exports: [
    IncomeListComponent,
    IncomeListItemComponent,
    IncomeModalComponent,
    ConfirmDeleteComponent
  ],
})
export class WebIncomeUiModule {}
