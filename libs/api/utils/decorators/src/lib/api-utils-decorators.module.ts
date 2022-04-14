import { Module } from '@nestjs/common';
import { IsUniqueCategory } from './isuniquecategory.decorator';
//import { IsUniqueLaden } from '../../../../feature/shop/src/lib/isuniqueladen.decorator';
import { Public } from './public.decorator';

@Module({
  controllers: [],
  providers: [],
  exports: [Public, IsUniqueCategory],
})
export class ApiUtilsDecoratorsModule {}
