import { Test, TestingModule } from '@nestjs/testing';
import { AusgabenService } from './ausgaben.service';

describe('AusgabenService', () => {
  let service: AusgabenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AusgabenService],
    }).compile();

    service = module.get<AusgabenService>(AusgabenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
