import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearMonthWeekComponent } from './year-month-week.component';

describe('YearMonthWeekComponent', () => {
  let component: YearMonthWeekComponent;
  let fixture: ComponentFixture<YearMonthWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearMonthWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearMonthWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
