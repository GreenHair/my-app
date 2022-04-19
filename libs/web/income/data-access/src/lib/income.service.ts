import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EinkommenDto } from '@my-app/shared/util/dto';
import { environment } from 'apps/my-app/src/environments/environment';
import { plainToClass, plainToInstance } from 'class-transformer';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private url : string = `${environment.apiUrl}/income`

  private params = new HttpParams()

  private income$ : BehaviorSubject<EinkommenDto[]> = new BehaviorSubject<EinkommenDto[]>([])

  constructor(private http: HttpClient) { 
    this.fetchIncome()
  }

  private fetchIncome() {
    this.http.get<EinkommenDto[]>(this.url, { params: this.params.set('year', 2022)/* .set('month', 4) */ })
    .subscribe(incomeList => this.income$.next(incomeList))
  }

  public getIncomeList() : Observable<EinkommenDto[]> {
    return this.income$
  }
}
