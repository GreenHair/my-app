import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Familienmitglied } from 'libs/api/data-access/entities/src/lib/Familienmitglied';
import { ApiFeatureFamilyMemberController } from './api-feature-family-member.controller';
import { FamilyMemberService } from './family-member.service';

@Module({
  controllers: [ApiFeatureFamilyMemberController],
  providers: [FamilyMemberService],
  exports: [FamilyMemberService],
  imports: [TypeOrmModule.forFeature([Familienmitglied])]
})
export class ApiFeatureFamilyMemberModule {}
