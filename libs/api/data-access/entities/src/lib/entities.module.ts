import { Module } from '@nestjs/common';
import { Users } from './Users';

@Module({
  controllers: [],
  providers: [],
  exports: [Users],
})
export class ApiDataAccessEntitiesModule {}
