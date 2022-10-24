import { Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, UntypedFormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface IPeriodQuery {
  period: string,
  query: {
    year: number,
    month?: number,
    week?: number
  }
}

@Component({
  selector: 'my-app-year-month-week',
  templateUrl: './year-month-week.component.html',
  styleUrls: ['./year-month-week.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: YearMonthWeekComponent,
      multi: true
    }
  ]
})
export class YearMonthWeekComponent implements OnDestroy, ControlValueAccessor {

  @Input() years: number[] = []
  @Input() showWeek: boolean = true

  private changeSubscription: Subscription

  form = this.fb.group({
    period: [''],
    query: this.fb.group({
      year: [''],
      month: [''],
      week: ['']
    })
  })

  onChange = (value: IPeriodQuery) => {}
  onTouched = () => {}

  get period() {
    return this.form.get('period')
  }

  constructor(private fb: UntypedFormBuilder) { 
    this.changeSubscription = this.form.valueChanges.subscribe(change => this.onChange(change))
      }

  writeValue(val: IPeriodQuery): void {
    this.form.patchValue(val) 
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
    }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  ngOnDestroy(): void {
      this.changeSubscription.unsubscribe()
  }

}
