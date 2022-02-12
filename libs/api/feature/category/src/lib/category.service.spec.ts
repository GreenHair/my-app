import { Test } from '@nestjs/testing';
import { CategoryService } from './category.service';

describe('ApiFeatureCategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
