import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produktgruppe } from 'libs/api/data-access/entities/src/lib/Produktgruppe';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';


@Module({
  imports: [TypeOrmModule.forFeature([Produktgruppe])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
