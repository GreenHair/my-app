import { TestBed } from '@angular/core/testing';

import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit invoices', () => {
    service.invoices$.subscribe((invoices) => {
      console.log("response", invoices)
    })
  })
});
