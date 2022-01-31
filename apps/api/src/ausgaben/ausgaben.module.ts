import { Module } from '@nestjs/common';
import { AusgabenService } from './ausgaben.service';
import { AusgabenController } from './ausgaben.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ausgaben } from '../entities/Ausgaben';
import { Produktgruppe } from '../entities/Produktgruppe';

@Module({
  imports: [TypeOrmModule.forFeature([Ausgaben, Produktgruppe])],
  providers: [AusgabenService],
  controllers: [AusgabenController]
})
export class AusgabenModule {}
