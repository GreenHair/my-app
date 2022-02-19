import { Test } from '@nestjs/testing';
import { ApiFeatureArticleService } from './api-feature-article.service';

describe('ApiFeatureArticleService', () => {
  let service: ApiFeatureArticleService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureArticleService],
    }).compile();

    service = module.get(ApiFeatureArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
