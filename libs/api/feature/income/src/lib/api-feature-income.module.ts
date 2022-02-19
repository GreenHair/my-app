import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Einkommen } from 'libs/api/data-access/entities/src/lib/Einkommen';
import { ApiFeatureIncomeController } from './api-feature-income.controller';
import { ApiFeatureIncomeService } from './api-feature-income.service';

@Module({
  controllers: [ApiFeatureIncomeController],
  providers: [ApiFeatureIncomeService],
  exports: [ApiFeatureIncomeService],
  imports: [TypeOrmModule.forFeature([Einkommen])]
})
export class ApiFeatureIncomeModule {}
