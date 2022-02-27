import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements OnInit {

  private invoiceUrl: string = 'invoice'

  private _invoices$: BehaviorSubject<RechnungDto[]> = new BehaviorSubject<RechnungDto[]>([])

  get invoices$(): Observable<RechnungDto[]> {
    return this._invoices$
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<RechnungDto[]>(`${environment.apiUrl}/${this.invoiceUrl}`).pipe(
      map(res => this._invoices$.next(res))
    )
  }
}
