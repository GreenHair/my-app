import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produktgruppe } from '../entities/Produktgruppe';
import { IsUniqueCategoryConstraint } from './isuniquecategory.decorator';
import { ProduktgruppeController } from './produktgruppe.controller';
import { ProduktgruppeService } from './produktgruppe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produktgruppe])],
  controllers: [ProduktgruppeController],
  providers: [ProduktgruppeService, IsUniqueCategoryConstraint]
})
export class ProduktgruppeModule {}
