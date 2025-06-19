import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MaterialModule } from './modules/material/material.module';
import { BarcodeModule } from './modules/barcode/barcode.module';
import { LogsModule } from './modules/logs/logs.module';
import { Log } from './modules/logs/logs.entity';
import { Barcode } from './modules/barcode/barcode.entity';
import { Material } from './modules/material/material.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sap-tracking.sqlite',
      synchronize: true, // ✅ Only for development/Poc
      entities: [Material, Barcode, Log],
    }),
    MaterialModule,
    BarcodeModule,
    LogsModule,
  ],
})
export class AppModule {}
