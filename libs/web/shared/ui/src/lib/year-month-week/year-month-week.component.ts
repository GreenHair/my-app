import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-app-year-month-week',
  templateUrl: './year-month-week.component.html',
  styleUrls: ['./year-month-week.component.css']
})
export class YearMonthWeekComponent implements OnInit {

  @Input() years: number[]

  period: FormControl

  constructor() { }

  ngOnInit(): void {
  }

}
