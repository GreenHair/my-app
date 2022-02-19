import { Module } from '@nestjs/common';
import { Einkommen } from './Einkommen';
import { Familienmitglied } from './Familienmitglied';
import { Laden } from './Laden';
import { Produktgruppe } from './Produktgruppe';
import { Users } from './Users';

@Module({
  controllers: [],
  providers: [],
  exports: [
    Users, 
    Produktgruppe, 
    Laden, 
    Familienmitglied,
    Einkommen
  ],
})
export class ApiDataAccessEntitiesModule {}
