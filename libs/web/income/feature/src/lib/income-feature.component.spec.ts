import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeFeatureComponent } from './income-feature.component';

describe('IncomeFeatureComponent', () => {
  let component: IncomeFeatureComponent;
  let fixture: ComponentFixture<IncomeFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
