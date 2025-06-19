import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { SapService } from './sap.service';
import { Material } from './interfaces/sap-material.interface';

@Controller('sap')
export class SapController {
  constructor(private readonly sapService: SapService) {}

  @Get('materials')
  getMaterials(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.sapService.fetchMaterials(Number(page), Number(limit));
  }

  @Get('materials/:id')
  getMaterial(@Param('id') id: string) {
    return this.sapService.getMaterialById(id);
  }

  @Post('materials')
  createMaterial(@Body() material: Material) {
    return this.sapService.createMaterial(material);
  }

  @Patch('materials/:id')
  updateMaterial(@Param('id') id: string, @Body() updates: Partial<Material>) {
    return this.sapService.updateMaterial(id, updates);
  }
}
