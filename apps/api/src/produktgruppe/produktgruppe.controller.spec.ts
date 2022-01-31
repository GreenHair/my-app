import { Test, TestingModule } from '@nestjs/testing';
import { ProduktgruppeController } from './produktgruppe.controller';

describe('ProduktgruppeController', () => {
  let controller: ProduktgruppeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProduktgruppeController],
    }).compile();

    controller = module.get<ProduktgruppeController>(ProduktgruppeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
