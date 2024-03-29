import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { AusgabenDto, CategoryDto, EinkommenDto, ShopDto } from '@my-app/shared/util/dto';
import { Invoice } from '@my-app/web/invoice/data-access';
import { SumPipe } from '@my-app/web/shared/utils';
import { BehaviorSubject, combineLatest, map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'my-app-quick-info',
  templateUrl: './quick-info.component.html',
  styleUrls: ['./quick-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickInfoComponent implements OnInit, OnChanges {

  @Input() categories!: CategoryDto[]
  @Input() shops!: ShopDto[]
  @Input() invoices!: Invoice[]
  @Input() income!: EinkommenDto[]

  catSelect = new UntypedFormControl("")
  shopSelect = new UntypedFormControl("")
  fixedOrVariable = this.fb.group({
    fixVar: ['']
  })
  foodOrNot = this.fb.group({
    foodOrNot: ['']
  })
  onOffLine = new UntypedFormControl("")

  articleTotal = new UntypedFormControl("")
  articleSelect$ = new BehaviorSubject<string>("")
  articleSum$!: Observable<AusgabenDto[]>

  catInvoices$!: Observable<AusgabenDto[]>
  shopInvoices$!: Observable<Invoice[]>
  fixedOrVariableInvoices$!: Observable<Invoice[]>
  foodNonFood$!: Observable<AusgabenDto[]>
  onOffLine$!: Observable<Invoice[]>
  private onChanges = new BehaviorSubject<boolean>(true)

  sumIn: number = 0;
  sumOut: number = 0;

  constructor(private sumPipe: SumPipe, private fb: UntypedFormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("quick info value changes", changes)
    if(changes["invoices"]){
      console.log("invoices changed")
      this.sumOut = this.sumPipe.transform(this.invoices)
      this.onChanges.next(true);  
    }
    if(changes["income"]){
      this.sumIn = this.sumPipe.transform(this.income)
    }
  }

  ngOnInit(): void {
    this.catInvoices$ = combineLatest({
      onInvoicechange: this.onChanges,
      catId: this.catSelect.valueChanges.pipe(startWith([]))
    }) .pipe(
      map(value => 
        this.extractArticles()
        .filter(ausgabe => ausgabe.prodGr.id == value.catId)),
        
    )

    this.shopInvoices$ =combineLatest({
      invoiceChange: this.onChanges,
      shopId: this.shopSelect.valueChanges.pipe(startWith([]))
    }).pipe(
      map(value => this.invoices.filter(i => i.laden.id == value.shopId)),
      startWith([])
    )

    this.fixedOrVariableInvoices$ = combineLatest({
      invoiceChange: this.onChanges,
      fixedOrVariable: this.fixedOrVariable.valueChanges.pipe(startWith([]))
    }).pipe(
      map(val => {
        switch (val.fixedOrVariable.fixVar) {
          case "variable":
            return this.invoices.filter(i => i.einmalig)
          case "fixed":
            return this.invoices.filter(i => !i.einmalig)
          default:
            return []
        }
      }),
      startWith([])
    )

    this.foodNonFood$ = combineLatest({
      invoiceChange: this.onChanges,
      foodNonFood: this.foodOrNot.valueChanges.pipe(startWith(""))
    }).pipe(
      map(val => {
        const current = this.invoices.filter(i => i.einmalig).reduce((prev, curr) => prev.concat(curr.ausgaben), [] as AusgabenDto[])
        switch (val.foodNonFood.foodOrNot) {
          case "food":
            return current.filter(a => a.prodGr.essen)
          case "nonfood":
            return current.filter(a => !a.prodGr.essen)
          default:
            return []
        }
      })
    )

    this.onOffLine$ = combineLatest({
      invoiceChange: this.onChanges,
      onOffLine: this.onOffLine.valueChanges.pipe(startWith(""))
    }).pipe(
      map(val => {
        switch (val.onOffLine) {
          case "online":
            return this.invoices.filter(i => i.laden.online && i.einmalig)
          case "offline":
            return this.invoices.filter(i => !i.laden.online && i.einmalig)
        
          default:
            return [];
        }
      })
    )

    this.articleSum$ = combineLatest({
      invoiceChange: this.onChanges,
      articleSelect: this.articleSelect$
    }).pipe(
      map(val => {
        const current = this.invoices.reduce((prev, curr) => prev.concat(curr.ausgaben), [] as AusgabenDto[])
        return current.filter(a => a.bezeichnung === val.articleSelect)
      })
    )
  }


  private extractArticles() {
    return this.invoices.reduce((prev, curr) => prev.concat(curr.ausgaben), [] as AusgabenDto[]);
  }
}
