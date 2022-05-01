import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EinkommenDto } from '@my-app/shared/util/dto';
import { environment } from 'apps/my-app/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private url : string = `${environment.apiUrl}/income`

  constructor(private http: HttpClient) { }

  public getIncomeList(query: any) : Observable<EinkommenDto[]> {
    const params = new HttpParams({fromObject: query})
    return this.http.get<EinkommenDto[]>(this.url, { params: params })
  }

  getYears() : Observable<number[]> {
    return this.http.get<number[]>(`${this.url}/years`)
  }
}
