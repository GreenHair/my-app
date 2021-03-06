import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearMonthWeekComponent } from './year-month-week/year-month-week.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadComponent } from './typeahead/typeahead.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    YearMonthWeekComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    DatepickerComponent,
    TypeaheadComponent
  ],
  exports: [
    YearMonthWeekComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    DatepickerComponent,
    TypeaheadComponent
  ],
})
export class WebSharedUiModule {}
