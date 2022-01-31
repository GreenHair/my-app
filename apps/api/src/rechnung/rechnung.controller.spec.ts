import { Test, TestingModule } from '@nestjs/testing';
import { RechnungController } from './rechnung.controller';

describe('RechnungController', () => {
  let controller: RechnungController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechnungController],
    }).compile();

    controller = module.get<RechnungController>(RechnungController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
