import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { GetMaterialDto } from './dto/get-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { SapService } from '../sap/sap.service';
import { Material as SAPMaterial } from '../sap/interfaces/sap-material.interface';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
    private readonly sapService: SapService,
  ) {}

  // DB: create
  async create(dto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepo.create(dto);
    return this.materialRepo.save(material);
  }

  // DB: find all with optional filter
  async findAll(filterDto: GetMaterialDto): Promise<Material[]> {
    const query = this.materialRepo.createQueryBuilder('material');

    if (filterDto.materialType) {
      query.andWhere('material.materialType = :materialType', {
        materialType: filterDto.materialType,
      });
    }

    if (filterDto.unitOfMeasure) {
      query.andWhere('material.unitOfMeasure = :unitOfMeasure', {
        unitOfMeasure: filterDto.unitOfMeasure,
      });
    }

    return query.getMany();
  }

  // DB: find by ID
  async findById(id: number): Promise<Material> {
    const material = await this.materialRepo.findOneBy({ id });
    if (!material) throw new NotFoundException('Material not found');
    return material;
  }

  // DB: update
  async update(id: number, dto: UpdateMaterialDto): Promise<Material> {
    const material = await this.findById(id);
    Object.assign(material, dto);
    return this.materialRepo.save(material);
  }

  // SAP: fetch
  async getMaterialsFromSAP(page = 1, limit = 10): Promise<SAPMaterial[]> {
    return this.sapService.fetchMaterials(page, limit);
  }

  async getMaterialFromSAP(id: string): Promise<SAPMaterial> {
    const material = await this.sapService.getMaterialById(id);
    if (!material) throw new NotFoundException('SAP Material not found');
    return material;
  }

  // SAP: create
  async createToSAP(material: SAPMaterial): Promise<SAPMaterial> {
    return this.sapService.createMaterial(material);
  }

  // SAP: update
  async updateToSAP(
    id: string,
    updates: Partial<SAPMaterial>,
  ): Promise<SAPMaterial> {
    const updated = await this.sapService.updateMaterial(id, updates);
    if (!updated) throw new NotFoundException('SAP material not found');
    return updated;
  }
}
