import { Module } from '@nestjs/common';
import { Produktgruppe } from './Produktgruppe';
import { Users } from './Users';

@Module({
  controllers: [],
  providers: [],
  exports: [Users, Produktgruppe],
})
export class ApiDataAccessEntitiesModule {}
