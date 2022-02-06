import { Test } from '@nestjs/testing';
import { ApiFeatureAuthService } from './api-feature-auth.service';

describe('ApiFeatureAuthService', () => {
  let service: ApiFeatureAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureAuthService],
    }).compile();

    service = module.get(ApiFeatureAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
