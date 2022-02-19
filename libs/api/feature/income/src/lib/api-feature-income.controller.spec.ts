import { Test } from '@nestjs/testing';
import { ApiFeatureIncomeController } from './api-feature-income.controller';
import { ApiFeatureIncomeService } from './api-feature-income.service';

describe('ApiFeatureIncomeController', () => {
  let controller: ApiFeatureIncomeController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureIncomeService],
      controllers: [ApiFeatureIncomeController],
    }).compile();

    controller = module.get(ApiFeatureIncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
