import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearMonthWeekComponent } from './year-month-week/year-month-week.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteButtonComponent } from './delete-button/delete-button.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    YearMonthWeekComponent,
    DeleteButtonComponent
  ],
  exports: [
    YearMonthWeekComponent,
    DeleteButtonComponent
  ],
})
export class WebSharedUiModule {}
