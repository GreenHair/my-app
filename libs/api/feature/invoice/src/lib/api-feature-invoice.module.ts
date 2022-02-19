import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ausgaben } from 'libs/api/data-access/entities/src/lib/Ausgaben';
import { Rechnung } from 'libs/api/data-access/entities/src/lib/Rechnung';
import { ApiFeatureInvoiceController } from './api-feature-invoice.controller';
import { ApiFeatureInvoiceService } from './api-feature-invoice.service';

@Module({
  controllers: [ApiFeatureInvoiceController],
  providers: [ApiFeatureInvoiceService],
  exports: [ApiFeatureInvoiceService],
  imports: [TypeOrmModule.forFeature([Rechnung, Ausgaben])]
})
export class ApiFeatureInvoiceModule {}
