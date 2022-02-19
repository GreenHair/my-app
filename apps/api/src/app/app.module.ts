import { DynamicModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { AuthModule } from '@my-app/api/feature/auth';
import { CategoryModule } from '@my-app/api/feature/category';
import { UserModule } from '@my-app/api/feature/user';
import { ShopModule } from '@my-app/api/feature/shop';
import { ApiFeatureFamilyMemberModule } from '@my-app/api/feature/family-member';
import { ApiFeatureIncomeModule } from '@my-app/api/feature/income';
import { ApiFeatureArticleModule } from 'libs/api/feature/article/src';
import { ApiFeatureInvoiceModule } from 'libs/api/feature/invoice/src';

@Module({
  imports: [
    AuthModule
  ]
})
export class AppModule { 
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [ AppController ],
      imports: [
        TypeOrmModule.forRoot({
          ...connOptions,
          autoLoadEntities: true,
        }),
        AuthModule,
        UserModule,
        CategoryModule,
        ShopModule,
        ApiFeatureFamilyMemberModule,
        ApiFeatureIncomeModule,
        ApiFeatureArticleModule,
        ApiFeatureInvoiceModule
      ],
      providers: [ AppService ]
    }
  }
}
