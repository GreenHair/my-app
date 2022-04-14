import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produktgruppe } from 'libs/api/data-access/entities/src/lib/Produktgruppe';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { IsUniqueCategoryConstraint } from './isuniquecategory.decorator';


@Module({
  imports: [TypeOrmModule.forFeature([Produktgruppe])],
  controllers: [CategoryController],
  providers: [CategoryService, IsUniqueCategoryConstraint],
  exports: [CategoryService],
})
export class CategoryModule {}
