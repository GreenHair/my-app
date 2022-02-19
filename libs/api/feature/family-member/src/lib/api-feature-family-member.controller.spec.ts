import { Test } from '@nestjs/testing';
import { ApiFeatureFamilyMemberController } from './api-feature-family-member.controller';

describe('ApiFeatureFamilyMemberController', () => {
  let controller: ApiFeatureFamilyMemberController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiFeatureFamilyMemberController],
    }).compile();

    controller = module.get(ApiFeatureFamilyMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
