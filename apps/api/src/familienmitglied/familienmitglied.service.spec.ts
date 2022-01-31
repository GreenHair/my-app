import { Test, TestingModule } from '@nestjs/testing';
import { FamilienmitgliedService } from './familienmitglied.service';

describe('FamilienmitgliedService', () => {
  let service: FamilienmitgliedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilienmitgliedService],
    }).compile();

    service = module.get<FamilienmitgliedService>(FamilienmitgliedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
