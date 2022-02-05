import { Module } from '@nestjs/common';
import { ApiAuthFeatureAuthController } from './api-auth-feature-auth.controller';

@Module({
  controllers: [ApiAuthFeatureAuthController],
  providers: [],
  exports: [],
})
export class ApiAuthFeatureAuthModule {}
