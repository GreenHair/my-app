import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laden } from '../entities/Laden';
import { Ausgaben } from '../entities/Ausgaben';
import { Familienmitglied } from '../entities/Familienmitglied';
import { Rechnung } from '../entities/Rechnung';
import { RechnungController } from './rechnung.controller';
import { RechnungService } from './rechnung.service';
import { Produktgruppe } from '../entities/Produktgruppe';

@Module({
  imports: [TypeOrmModule.forFeature([Rechnung, Familienmitglied, Laden, Ausgaben, Produktgruppe])],
  controllers: [RechnungController],
  providers: [RechnungService]
})
export class RechnungModule {}
