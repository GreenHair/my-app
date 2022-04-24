import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { RechnungQuery } from '@my-app/shared/util/dto';
import * as moment from 'moment'
import { Observable, Subscription } from 'rxjs';

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
  styleUrls: ['./year-month-week.component.css']
})
export class YearMonthWeekComponent implements OnChanges, OnDestroy {

  @Input() years: number[]
  @Input() initialValues: IPeriodQuery
  @Output() formChanged: any = new EventEmitter<IPeriodQuery>()

  private changeSubscription: Subscription

  form = this.fb.group({
    period: [''],
    query: this.fb.group({
      year: [''],
      month: [''],
      week: ['']
    })
  })

  get period() {
    return this.form.get('period')
  }

  constructor(private fb: FormBuilder) { 
    this.changeSubscription = this.form.valueChanges.subscribe((event) => {
      if(this.formChanged) {
        this.formChanged.emit(this.form.value)
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes['initialValues']) {
      this.form.patchValue(changes['initialValues'].currentValue, {emitEvent: true})
    }
  }

  ngOnDestroy(): void {
      this.changeSubscription.unsubscribe()
  }

}
