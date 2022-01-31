import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laden } from '../entities/Laden';
import { IsUniqueLadenConstraint } from '../laden/isuniqueladen.decorator';
import { LadenController } from './laden.controller';
import { LadenService } from './laden.service';

@Module({
  imports:[TypeOrmModule.forFeature([Laden])],
  controllers: [LadenController],
  providers: [LadenService, IsUniqueLadenConstraint]
})
export class LadenModule {}
