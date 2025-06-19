import { Module } from '@nestjs/common';
import { SapService } from './sap.service';
import { SapController } from './sap.controller';

@Module({
  providers: [SapService],
  controllers: [SapController],
  exports: [SapService], // so other modules can use it
})
export class SapModule {}
