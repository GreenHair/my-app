import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTableRowComponent } from './category-table-row.component';

describe('CategoryTableRowComponent', () => {
  let component: CategoryTableRowComponent;
  let fixture: ComponentFixture<CategoryTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
