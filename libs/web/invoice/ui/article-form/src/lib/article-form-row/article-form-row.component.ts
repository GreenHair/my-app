import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, OperatorFunction, Subscription, switchMap, tap } from 'rxjs';
import  { CategoryService } from 'libs/web/shared/category/data-access/src/lib/category.service'
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'apps/my-app/src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  articleUrl = `${environment.apiUrl}/article/description`
  searching : boolean = false
  searchFailed = false
  params = new HttpParams()

  articleForm = this.fb.group({
    bezeichnung: [''],
    betrag: [''],
    prodGr: ['']
  })  

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private http: HttpClient) { }
  
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

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.http.get<string[]>(this.articleUrl, { params: this.params.set('startsWith', term)})
        .pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

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
