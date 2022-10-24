import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { EinkommenDto } from '@my-app/shared/util/dto';
import { IncomeService } from '@my-app/web/income/data-access';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent, IncomeModalComponent } from '@my-app/web/income/ui';
import { IPeriodQuery } from '@my-app/web/shared/ui';
import * as moment from 'moment';
import { combineLatest, map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { FamilyMemberService } from '@my-app/web/shared/family-member/data-access';

@Component({
  selector: 'my-app-income-feature',
  templateUrl: './income-feature.component.html',
  styleUrls: ['./income-feature.component.css']
})
export class IncomeFeatureComponent implements OnInit {

  private modalClosed$ = new Subject<boolean>()
  incomeList$ : Observable<EinkommenDto[]>
  years$ : Observable<number[]>
  //periodSelectionChanged$ = new Subject()
  initialValues: IPeriodQuery = {
    period: 'month',
    query: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      week: moment().isoWeek()
    }
  }

  periodSelector = new UntypedFormControl(this.initialValues)

  constructor(private service: IncomeService, private modalService: NgbModal, private familyService: FamilyMemberService) { }

  ngOnInit(): void {
    this.incomeList$ = combineLatest([this.periodSelector.valueChanges.pipe(
      startWith(this.initialValues)), this.modalClosed$.pipe(startWith(true))]).pipe(
      map(([formValue, modalClosed]) => {
        const periodQuery = formValue as IPeriodQuery
        let query: { year: number, month?: number, week?: number } = { year: periodQuery.query.year }
        switch (periodQuery.period) {
          case 'month': query = { ...query, month: periodQuery.query.month }; break;
        }
        return query
      }),
      switchMap(query => this.service.getIncomeList(query)),
      map(income => income.sort((a,b) => a.datum > b.datum ? -1 : 1))
    )
    
    this.years$ = this.service.getYears()
  }

  openModal(income: EinkommenDto | undefined = undefined) {
    const modalRef = this.modalService.open(IncomeModalComponent, { size: 'lg' })
    modalRef.componentInstance.family = this.familyService.getFamily()
    if(income !== undefined){
      modalRef.componentInstance.data = income
    }

    modalRef.closed.pipe(
      tap(val => console.log("income", val)),
      switchMap(val => this.service.save(val)),
      tap(val => this.modalClosed$.next(true))
    ).subscribe(response => console.log("reposnse from save", response))
  }

  confirmDelete(incomeNr: any) {
    const modalRef = this.modalService.open(ConfirmDeleteComponent)
    modalRef.componentInstance.nr = incomeNr
    modalRef.closed.pipe(
      switchMap(nr => this.service.delete(incomeNr)),
      tap(res => this.modalClosed$.next(true)),
    ).subscribe(response => console.log("reponse delete", response))
  }

}
