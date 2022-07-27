import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, OperatorFunction, Subscription, switchMap, tap } from 'rxjs';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { compareById } from '@my-app/web/shared/utils';
import { environment } from 'apps/my-app/src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '@my-app/web/shared/category/data-access';
import { TypeaheadComponent } from '@my-app/web/shared/ui'

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

  @ViewChild('bezeichnung') bezeichnug: TypeaheadComponent
  @Input() categories: CategoryDto[] | null

  onChangeSubs: Subscription[] = [];
  onTouched: Function = () => { };

  // articleUrl = `${environment.apiUrl}/article/description`
  // searching: boolean = false
  // searchFailed = false
  // params = new HttpParams()

  articleForm = this.fb.group({
    id: [''],
    bezeichnung: [''],
    betrag: [''],
    prodGr: [''],
    //rechnungsnr: ['']
  })

  get prodGr() {
    return this.articleForm.get('prodGr')
  }

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private http: HttpClient) { }

  writeValue(value: any) {
    if (value) {
      this.articleForm.setValue(value, { emitEvent: false });
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

  // search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     tap(() => this.searching = true),
  //     switchMap(term =>
  //       this.http.get<string[]>(this.articleUrl, { params: this.params.set('startsWith', term) })
  //         .pipe(
  //           tap(() => this.searchFailed = false),
  //           catchError(() => {
  //             this.searchFailed = true;
  //             return of([]);
  //           }))
  //     ),
  //     tap(() => this.searching = false)
  //   )

  /* formatter = (x: CategoryDto) => x.bezeichnung; */

  onSelectItem(event: NgbTypeaheadSelectItemEvent) {
    this.categoryService.getByArticle(event.item)
    .subscribe(category => this.prodGr?.setValue(category))
  }

  compareId(obj1: any, obj2: any): boolean {
    return compareById(obj1, obj2)
  }

  ngOnInit(): void {
    //this.categories$ = this.categoryService.getCategories()
  }

  ngAfterViewInit(): void {
    this.bezeichnug.articleInput.nativeElement.focus()
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

}
