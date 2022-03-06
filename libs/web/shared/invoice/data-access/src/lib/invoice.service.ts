import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { plainToClass } from 'class-transformer';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoiceUrl: string = 'invoice'

  private invoices$: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([])

  getInvoices(): Observable<Invoice[]> {
    return this.invoices$
  }

  constructor(private http: HttpClient) {
    this.fetchInvoices()
   }

  private fetchInvoices(): void {
    this.http.get<RechnungDto[]>(`${environment.apiUrl}/${this.invoiceUrl}`).pipe(
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
}
