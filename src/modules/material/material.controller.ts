import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { GetMaterialDto } from './dto/get-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material as LocalMaterial } from './material.entity';
import { Material as SAPMaterial } from '../sap/interfaces/sap-material.interface';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  // 1. Create to DB
  @Post()
  create(@Body() dto: CreateMaterialDto): Promise<LocalMaterial> {
    return this.materialService.create(dto);
  }

  // 2. Get all from DB (with optional filters)
  @Get()
  getAll(@Query() filterDto: GetMaterialDto): Promise<LocalMaterial[]> {
    return this.materialService.findAll(filterDto);
  }

  // 3. Get by ID from DB
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<LocalMaterial> {
    return this.materialService.findById(id);
  }

  // 4. Update to DB
  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaterialDto,
  ): Promise<LocalMaterial> {
    return this.materialService.update(id, dto);
  }

  // 5. Get from SAP
  @Get('sap/all')
  getSAPMaterials(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<SAPMaterial[]> {
    return this.materialService.getMaterialsFromSAP(+page, +limit);
  }

  // 6. Get SAP material by ID
  @Get('sap/:id')
  getSAPById(@Param('id') id: string): Promise<SAPMaterial> {
    return this.materialService.getMaterialFromSAP(id);
  }

  // 7. Create material in SAP
  @Post('sap')
  createToSAP(@Body() dto: SAPMaterial): Promise<SAPMaterial> {
    return this.materialService.createToSAP(dto);
  }

  // 8. Update material in SAP
  @Patch('sap/:id')
  updateToSAP(
    @Param('id') id: string,
    @Body() updates: Partial<SAPMaterial>,
  ): Promise<SAPMaterial> {
    return this.materialService.updateToSAP(id, updates);
  }
}
