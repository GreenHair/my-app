import { Test } from '@nestjs/testing';
import { ApiFeatureShopController } from './api-feature-shop.controller';
import { ApiFeatureShopService } from './api-feature-shop.service';

describe('ApiFeatureShopController', () => {
  let controller: ApiFeatureShopController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureShopService],
      controllers: [ApiFeatureShopController],
    }).compile();

    controller = module.get(ApiFeatureShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
