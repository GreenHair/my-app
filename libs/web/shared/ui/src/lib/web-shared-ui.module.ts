import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearMonthWeekComponent } from './year-month-week/year-month-week.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    YearMonthWeekComponent
  ],
  exports: [
    YearMonthWeekComponent
  ],
})
export class WebSharedUiModule {}
