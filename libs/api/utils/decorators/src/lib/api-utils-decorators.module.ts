import { Module } from '@nestjs/common';
import { Public } from './public.decorator';

@Module({
  controllers: [],
  providers: [],
  exports: [Public],
})
export class ApiUtilsDecoratorsModule {}
