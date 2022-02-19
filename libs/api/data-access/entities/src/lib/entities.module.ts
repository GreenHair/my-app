import { Module } from '@nestjs/common';
import { Ausgaben } from './Ausgaben';
import { Einkommen } from './Einkommen';
import { Familienmitglied } from './Familienmitglied';
import { Laden } from './Laden';
import { Produktgruppe } from './Produktgruppe';
import { Rechnung } from './Rechnung';
import { Users } from './Users';

@Module({
  controllers: [],
  providers: [],
  exports: [
    Users, 
    Produktgruppe, 
    Laden, 
    Familienmitglied,
    Einkommen,
    Ausgaben,
    Rechnung
  ],
})
export class ApiDataAccessEntitiesModule {}
