import { Test, TestingModule } from '@nestjs/testing';
import { LadenService } from './laden.service';

describe('LadenService', () => {
  let service: LadenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LadenService],
    }).compile();

    service = module.get<LadenService>(LadenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
