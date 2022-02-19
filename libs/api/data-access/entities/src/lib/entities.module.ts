import { Module } from '@nestjs/common';
import { Familienmitglied } from './Familienmitglied';
import { Laden } from './Laden';
import { Produktgruppe } from './Produktgruppe';
import { Users } from './Users';

@Module({
  controllers: [],
  providers: [],
  exports: [Users, Produktgruppe, Laden, Familienmitglied],
})
export class ApiDataAccessEntitiesModule {}
