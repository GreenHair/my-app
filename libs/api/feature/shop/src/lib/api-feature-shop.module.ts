import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laden } from 'libs/api/data-access/entities/src/lib/Laden';
import { ApiFeatureShopController } from './api-feature-shop.controller';
import { ApiFeatureShopService } from './api-feature-shop.service';

@Module({
  controllers: [ApiFeatureShopController],
  providers: [ApiFeatureShopService],
  exports: [ApiFeatureShopService],
  imports: [TypeOrmModule.forFeature([Laden])]
})
export class ApiFeatureShopModule {}
