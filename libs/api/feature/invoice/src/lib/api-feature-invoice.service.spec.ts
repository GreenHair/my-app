import { Test } from '@nestjs/testing';
import { ApiFeatureInvoiceService } from './api-feature-invoice.service';

describe('ApiFeatureInvoiceService', () => {
  let service: ApiFeatureInvoiceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureInvoiceService],
    }).compile();

    service = module.get(ApiFeatureInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
