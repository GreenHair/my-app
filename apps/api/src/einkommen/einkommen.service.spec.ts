import { Test, TestingModule } from '@nestjs/testing';
import { EinkommenService } from './einkommen.service';

describe('EinkommenService', () => {
  let service: EinkommenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EinkommenService],
    }).compile();

    service = module.get<EinkommenService>(EinkommenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
