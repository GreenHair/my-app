import { Test } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

describe('ShopController', () => {
  let controller: ShopController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ShopService],
      controllers: [ShopController],
    }).compile();

    controller = module.get(ShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
