import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laden } from 'libs/api/data-access/entities/src/lib/Laden';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
  imports: [TypeOrmModule.forFeature([Laden])]
})
export class ShopModule {}
