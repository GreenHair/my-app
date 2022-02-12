import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthController, AuthModule } from '@my-app/api/feature/auth';
import { Users } from 'libs/api/data-access/entities/src/lib/Users';
import { CategoryController, CategoryModule } from '@my-app/api/feature/category';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          entities: [Users]
        }),
    }),
    AuthModule,
    CategoryModule
  ],
  controllers: [
    AppController,
    AuthController,
    CategoryController,
  ],
  providers: [AppService],
})
export class AppModule { }
