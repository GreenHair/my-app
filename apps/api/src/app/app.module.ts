import { DynamicModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions, getConnectionOptions } from 'typeorm';
import { AuthController, AuthModule } from '@my-app/api/feature/auth';
import { Users } from 'libs/api/data-access/entities/src/lib/Users';
import { CategoryController, CategoryModule } from '@my-app/api/feature/category';
import { Produktgruppe } from 'libs/api/data-access/entities/src/lib/Produktgruppe';
import { UserModule } from '@my-app/api/data-access/user/user';

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
        CategoryModule
      ],
      providers: [ AppService ]
    }
  }
}
