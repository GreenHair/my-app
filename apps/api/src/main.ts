import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { getDbConnectionOptions, runDbMigrations } from './shared/utils';
import { AuthGuard } from './auth/auth.guard';
import { Container } from 'typedi';
import { useContainer, Validator } from 'class-validator';
import 'reflect-metadata';
import { LadenModule } from './laden/laden.module';

const port = process.env['PORT'] || 3333

async function bootstrap() {  
    const app = await NestFactory.create(AppModule.forRoot(await
        getDbConnectionOptions(process.env['NODE_ENV'])),
    );

    useContainer(app.select(LadenModule), { fallbackOnErrors: true });

    app.enableCors()
    /**
    * Run DB migrations
    */
    //await runDbMigrations();
   
    const reflector = app.get(Reflector);
    app.useGlobalGuards(new AuthGuard(reflector));
    
    await app.listen(port);
    
    Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
