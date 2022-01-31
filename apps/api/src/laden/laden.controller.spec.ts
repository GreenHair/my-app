import { Test, TestingModule } from '@nestjs/testing';
import { LadenController } from './laden.controller';

describe('LadenController', () => {
  let controller: LadenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LadenController],
    }).compile();

    controller = module.get<LadenController>(LadenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
