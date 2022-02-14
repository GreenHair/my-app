import { Test } from '@nestjs/testing';
import { ApiFeatureShopService } from './api-feature-shop.service';

describe('ApiFeatureShopService', () => {
  let service: ApiFeatureShopService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureShopService],
    }).compile();

    service = module.get(ApiFeatureShopService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
