import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ausgaben } from 'libs/api/data-access/entities/src/lib/Ausgaben';
import { Rechnung } from 'libs/api/data-access/entities/src/lib/Rechnung';
import { ApiFeatureArticleController } from './api-feature-article.controller';
import { ApiFeatureArticleService } from './api-feature-article.service';

@Module({
  controllers: [ApiFeatureArticleController],
  providers: [ApiFeatureArticleService],
  exports: [ApiFeatureArticleService],
  imports: [TypeOrmModule.forFeature([Ausgaben, Rechnung])]
})
export class ApiFeatureArticleModule {}
