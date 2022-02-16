import { Test } from '@nestjs/testing';
import { ShopService } from './shop.service';

describe('ApiFeatureShopService', () => {
  let service: ShopService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ShopService],
    }).compile();

    service = module.get(ShopService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
