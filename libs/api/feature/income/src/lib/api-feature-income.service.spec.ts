import { Test } from '@nestjs/testing';
import { ApiFeatureIncomeService } from './api-feature-income.service';

describe('ApiFeatureIncomeService', () => {
  let service: ApiFeatureIncomeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureIncomeService],
    }).compile();

    service = module.get(ApiFeatureIncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
