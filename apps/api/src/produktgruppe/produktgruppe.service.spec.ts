import { Test, TestingModule } from '@nestjs/testing';
import { ProduktgruppeService } from './produktgruppe.service';

describe('ProduktgruppeService', () => {
  let service: ProduktgruppeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduktgruppeService],
    }).compile();

    service = module.get<ProduktgruppeService>(ProduktgruppeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
