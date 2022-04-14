import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laden } from 'libs/api/data-access/entities/src/lib/Laden';
import { IsUniqueLadenConstraint } from './isuniqueladen.decorator';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService, IsUniqueLadenConstraint],
  exports: [ShopService],
  imports: [TypeOrmModule.forFeature([Laden])]
})
export class ShopModule {}
