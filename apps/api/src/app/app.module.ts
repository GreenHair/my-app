import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LadenModule } from '../laden/laden.module';
import { RechnungModule } from '../rechnung/rechnung.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ProduktgruppeModule } from '../produktgruppe/produktgruppe.module';
import { FamilienmitgliedModule } from '../familienmitglied/familienmitglied.module';
import { AusgabenModule } from '../ausgaben/ausgaben.module';
import { EinkommenModule } from '../einkommen/einkommen.module';

@Module({
  imports: [
    RechnungModule, 
    UserModule, 
    AuthModule, 
    ProduktgruppeModule, 
    FamilienmitgliedModule, 
    AusgabenModule, EinkommenModule],
})
export class AppModule {
    static forRoot(
    connOptions: ConnectionOptions): DynamicModule {
        return {
        module: AppModule,
        controllers: [
          AppController
        ],
        imports: [
          LadenModule, 
          RechnungModule, 
          ProduktgruppeModule,
          FamilienmitgliedModule,
          TypeOrmModule.forRoot(connOptions)],
        providers: [AppService],
        };
    }
}

