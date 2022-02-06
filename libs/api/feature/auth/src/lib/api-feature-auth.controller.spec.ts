import { Test } from '@nestjs/testing';
import { ApiFeatureAuthController } from './api-feature-auth.controller';
import { ApiFeatureAuthService } from './api-feature-auth.service';

describe('ApiFeatureAuthController', () => {
  let controller: ApiFeatureAuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureAuthService],
      controllers: [ApiFeatureAuthController],
    }).compile();

    controller = module.get(ApiFeatureAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
