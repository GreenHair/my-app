import { Test } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('ApiFeatureCategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CategoryService],
      controllers: [CategoryController],
    }).compile();

    controller = module.get(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
