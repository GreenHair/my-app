import { Module } from '@nestjs/common';
import { Laden } from './Laden';
import { Produktgruppe } from './Produktgruppe';
import { Users } from './Users';

@Module({
  controllers: [],
  providers: [],
  exports: [Users, Produktgruppe, Laden],
})
export class ApiDataAccessEntitiesModule {}
