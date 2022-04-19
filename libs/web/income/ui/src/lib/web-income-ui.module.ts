import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeListComponent } from './income-list.component';
import { IncomeListItemComponent } from './income-list-item/income-list-item.component';
import { GroupByMonthPipeModule } from '@my-app/web/income/utils';

@NgModule({
  imports: [CommonModule, GroupByMonthPipeModule],
  declarations: [
    IncomeListComponent,
    IncomeListItemComponent
  ],
  exports: [
    IncomeListComponent,
    IncomeListItemComponent
  ],
})
export class WebIncomeUiModule {}
