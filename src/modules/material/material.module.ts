import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // ✅ important
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { Material } from './material.entity'; // ✅ import your entity
import { SapModule } from '../sap/sap.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material]), // ✅ this line registers the repository
    SapModule,
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [MaterialService], // optional, only if needed in other modules
})
export class MaterialModule {}
