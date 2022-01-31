import { Test, TestingModule } from '@nestjs/testing';
import { EinkommenController } from './einkommen.controller';

describe('EinkommenController', () => {
  let controller: EinkommenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EinkommenController],
    }).compile();

    controller = module.get<EinkommenController>(EinkommenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
