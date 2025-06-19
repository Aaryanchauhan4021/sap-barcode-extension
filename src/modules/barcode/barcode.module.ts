import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barcode } from './barcode.entity';
import { BarcodeService } from './barcode.service';
import { BarcodeController } from './barcode.controller';
import { SapModule } from '../sap/sap.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Barcode]), SapModule, LogsModule],
  providers: [BarcodeService],
  controllers: [BarcodeController],
  exports: [BarcodeService],
})
export class BarcodeModule {}
