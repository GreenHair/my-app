import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFormRowComponent } from './article-form-row.component';

describe('ArticleFormRowComponent', () => {
  let component: ArticleFormRowComponent;
  let fixture: ComponentFixture<ArticleFormRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleFormRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
