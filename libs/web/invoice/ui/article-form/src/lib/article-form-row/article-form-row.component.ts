import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { Observable, Subscription } from 'rxjs';
import  { CategoryService } from 'libs/web/shared/category/data-access/src/lib/category.service'
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'my-app-article-form-row',
  templateUrl: './article-form-row.component.html',
  styleUrls: ['./article-form-row.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ArticleFormRowComponent,
      multi: true
    }
  ]
})
export class ArticleFormRowComponent implements AfterViewInit, OnInit, ControlValueAccessor, OnDestroy {

  @ViewChild('bezeichnung') bezeichnug : ElementRef
  categories$ : Observable<CategoryDto[]>

  onChangeSubs: Subscription[] = [];
  onTouched: Function = () => {};

  articleForm = this.fb.group({
    bezeichnung: [''],
    betrag: [''],
    prodGr: ['']
  })  

  constructor(private categoryService: CategoryService, private fb: FormBuilder) { }
  
  writeValue(value: any) {
    if (value) {
      this.articleForm.setValue(value, {emitEvent: false});
    }
  }
  registerOnChange(onChange: any): void {
    const sub = this.articleForm.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.articleForm.disable();
    }
    else {
      this.articleForm.enable();
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories()
  }

  ngAfterViewInit(): void {
    this.bezeichnug.nativeElement.focus()
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

}
