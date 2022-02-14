import { Module } from '@nestjs/common';
import { IsUniqueCategory } from './isuniquecategory.decorator';
import { IsUniqueLaden } from './isuniqueladen.decorator';
import { Public } from './public.decorator';

@Module({
  controllers: [],
  providers: [],
  exports: [Public, IsUniqueCategory, IsUniqueLaden],
})
export class ApiUtilsDecoratorsModule {}
