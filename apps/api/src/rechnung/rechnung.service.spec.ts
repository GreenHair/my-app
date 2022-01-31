import { Test, TestingModule } from '@nestjs/testing';
import { RechnungService } from './rechnung.service';

describe('RechnungService', () => {
  let service: RechnungService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RechnungService],
    }).compile();

    service = module.get<RechnungService>(RechnungService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
