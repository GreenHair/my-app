import { Module } from '@nestjs/common';
import { EinkommenService } from './einkommen.service';
import { EinkommenController } from './einkommen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Einkommen } from '../entities/Einkommen';
import { Familienmitglied } from '../entities/Familienmitglied';

@Module({
  imports: [TypeOrmModule.forFeature([Einkommen, Familienmitglied])],
  providers: [EinkommenService],
  controllers: [EinkommenController]
})
export class EinkommenModule {}
