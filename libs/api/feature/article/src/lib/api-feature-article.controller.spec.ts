import { Test } from '@nestjs/testing';
import { ApiFeatureArticleController } from './api-feature-article.controller';
import { ApiFeatureArticleService } from './api-feature-article.service';

describe('ApiFeatureArticleController', () => {
  let controller: ApiFeatureArticleController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureArticleService],
      controllers: [ApiFeatureArticleController],
    }).compile();

    controller = module.get(ApiFeatureArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
