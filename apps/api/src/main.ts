/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'dotenv/config';
import { AuthGuard } from '@my-app/api/feature/auth';
import { Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { getDbConnectionOptions } from '@my-app/utils/db-access';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(await
    getDbConnectionOptions()  
  ));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));

  app.enableCors()

  const port = process.env.PORT || 3333;
  
  const config = new DocumentBuilder()
    .setTitle('Haushaltsbuch API')
    .setDescription('The Haushaltsbuch API description')
    .setVersion('0.0.1')
    .addTag('haushalt')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
