import { Test, TestingModule } from '@nestjs/testing';
import { AusgabenController } from './ausgaben.controller';

describe('AusgabenController', () => {
  let controller: AusgabenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AusgabenController],
    }).compile();

    controller = module.get<AusgabenController>(AusgabenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
