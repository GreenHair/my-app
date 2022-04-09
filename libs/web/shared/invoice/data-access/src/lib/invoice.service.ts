import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { plainToClass } from 'class-transformer';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoiceUrl: string = `${environment.apiUrl}/invoice`

  private params = new HttpParams()

  private invoices$: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([])

  getInvoices(): Observable<Invoice[]> {
    return this.invoices$
  }

  constructor(private http: HttpClient) {
    this.fetchInvoices()
   }

  private fetchInvoices(): void {
    this.http.get<RechnungDto[]>(this.invoiceUrl, { params: this.params.set('year', 2022).set('month', 4)}).pipe(
      map(invoices => {
        const temp: Invoice[] = []
        for(let i = 0; i < invoices.length; i++) {
          temp.push(plainToClass(Invoice, invoices[i]))
        }
        return temp
      })
    )
    .subscribe(
      invoices => this.invoices$.next(invoices)
    )
  }

  saveInvoice(invoice: RechnungDto) {
    console.log(invoice)
    if(invoice.id) {
      return this.http.put(`${this.invoiceUrl}/${invoice.id}`, invoice).pipe(
        tap(()  => this.fetchInvoices())
      )
    }
    return this.http.post(this.invoiceUrl, invoice).pipe(
      tap(() => this.fetchInvoices())
    )
  }
}
