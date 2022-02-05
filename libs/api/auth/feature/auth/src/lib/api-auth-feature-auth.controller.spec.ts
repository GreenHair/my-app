import { Test } from '@nestjs/testing';
import { ApiAuthFeatureAuthController } from './api-auth-feature-auth.controller';

describe('ApiAuthFeatureAuthController', () => {
  let controller: ApiAuthFeatureAuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAuthFeatureAuthController],
    }).compile();

    controller = module.get(ApiAuthFeatureAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
