import { Test } from '@nestjs/testing';
import { ApiFeatureInvoiceController } from './api-feature-invoice.controller';
import { ApiFeatureInvoiceService } from './api-feature-invoice.service';

describe('ApiFeatureInvoiceController', () => {
  let controller: ApiFeatureInvoiceController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureInvoiceService],
      controllers: [ApiFeatureInvoiceController],
    }).compile();

    controller = module.get(ApiFeatureInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
