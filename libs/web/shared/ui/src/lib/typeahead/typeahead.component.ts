import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'apps/my-app/src/environments/environment';
import { invalid } from 'moment';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, OperatorFunction, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'my-app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TypeaheadComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: TypeaheadComponent}
  ]
})
export class TypeaheadComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Output() onSelectItem = new EventEmitter<NgbTypeaheadSelectItemEvent>()
  @ViewChild('articleInput') articleInput!: ElementRef

  article = new UntypedFormControl('')
  articleUrl = `${environment.apiUrl}/article/description`
  searching: boolean = false
  searchFailed = false
  params = new HttpParams()

  get valid() { return this.article.valid}

  get invalid() { return !this.valid; }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.http.get<string[]>(this.articleUrl, { params: this.params.set('startsWith', term) })
          .pipe(
            tap(() => this.searchFailed = false),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            }))
      ),
      tap(() => this.searching = false)
    )

  onChange = (val: string) => {}
  onTouched = () => {}

  private onChangeSub!: Subscription

  constructor(private http: HttpClient) { }

  registerOnValidatorChange?(fn: () => void): void {
    //throw new Error('Method not implemented.');
    console.log("typeahead validator changed", fn)
    
  }
  
  ngOnInit(): void {
    // this.onChangeSub = this.article.valueChanges.subscribe(val => this.onChange(val))
  }

  writeValue(obj: any): void {
    if(obj) {
      this.article.setValue(obj, { emitEvent: false })
    }
  }
  
  registerOnChange(fn: any): void {
    // this.onChange = fn
    this.onChangeSub = this.article.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  ngOnDestroy(): void {
   this.onChangeSub.unsubscribe() 
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log("validating typeahead. value is", this.article.value)
    const articleName = control.value;
    if (articleName.length > 0) {
      return null;
    }
    return {
      mustHaveName: {
        articleName
      }
    }
  }
}
