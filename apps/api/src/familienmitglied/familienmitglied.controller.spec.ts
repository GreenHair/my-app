import { Test, TestingModule } from '@nestjs/testing';
import { FamilienmitgliedController } from './familienmitglied.controller';

describe('FamilienmitgliedController', () => {
  let controller: FamilienmitgliedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilienmitgliedController],
    }).compile();

    controller = module.get<FamilienmitgliedController>(FamilienmitgliedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
