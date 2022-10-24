import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomAdapter } from '@my-app/web/invoice/utils';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatepickerComponent
    },
    {
      provide: NgbDateAdapter,
      useClass: CustomAdapter
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor, OnDestroy {

  date = new UntypedFormControl('');

  private onchangeSub!: Subscription

  onChange = (date: any) => {}
  onTouched = () => {}

  constructor() { }

  writeValue(obj: any): void {
    this.date.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.onchangeSub = this.date.valueChanges.subscribe(val => this.onChange(val))
  }

  ngOnDestroy(): void {
    this.onchangeSub.unsubscribe() 
  }
}
