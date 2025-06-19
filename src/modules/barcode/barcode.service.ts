import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barcode } from './barcode.entity';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { ScanBarcodeDto } from './dto/scan-barcode.dto';
import { SapService } from '../sap/sap.service';
import { LogsService } from '../logs/logs.service';
import { BarcodeFilterDto } from './dto/barcode-filter.dto';
@Injectable()
export class BarcodeService {
  constructor(
    @InjectRepository(Barcode)
    private readonly barcodeRepo: Repository<Barcode>,
    private readonly sapService: SapService,
    private readonly logsService: LogsService,
  ) {}

  async generateBarcode(dto: CreateBarcodeDto): Promise<Barcode> {
    let materialName = dto.materialName;
    let urgencyLevel = dto.urgencyLevel;
    let expiryDate = dto.expiryDate;

    if (!materialName || !urgencyLevel || !expiryDate) {
      const material = await this.sapService.getMaterialById(dto.materialId);
      if (!material) {
        throw new NotFoundException('Material not found');
      }

      // Auto-fill missing fields
      materialName = material.name;
      urgencyLevel = urgencyLevel ?? material.urgencyLevel;
      expiryDate = expiryDate ?? material.expiryDate;
    }

    const barcode = this.barcodeRepo.create({
      ...dto,
      materialName,
      urgencyLevel,
      expiryDate,
      remainingQty: dto.totalQty,
    });

    return this.barcodeRepo.save(barcode);
  }

  async useBarcode(barcodeId: string, usedQty: number): Promise<Barcode> {
    const barcode = await this.barcodeRepo.findOneBy({ id: barcodeId });
    if (!barcode) throw new NotFoundException('Barcode not found');

    if (barcode.remainingQty < usedQty) {
      throw new BadRequestException('Not enough quantity left');
    }

    barcode.remainingQty -= usedQty;
    return this.barcodeRepo.save(barcode);
  }

  async getAvailableQty(barcodeId: string): Promise<number> {
    const barcode = await this.barcodeRepo.findOneBy({ id: barcodeId });
    if (!barcode) throw new NotFoundException('Barcode not found');
    return barcode.remainingQty;
  }

  async getUrgentBarcodes(): Promise<Barcode[]> {
    return this.barcodeRepo.find({
      where: { urgencyLevel: 'HIGH' },
      order: { expiryDate: 'ASC' },
    });
  }

  async scanBarcode(dto: ScanBarcodeDto): Promise<Barcode> {
    const { barcode, usedQty } = dto;
    const existing = await this.barcodeRepo.findOneBy({ id: barcode });
    if (!existing) throw new NotFoundException('Barcode not found');

    if (existing.remainingQty < usedQty) {
      throw new BadRequestException('Not enough quantity left to scan');
    }

    existing.remainingQty -= usedQty;
    const updated = await this.barcodeRepo.save(existing);

    //  Log entry create karo
    await this.logsService.createLog({
      barcodeId: barcode,
      action: 'scanned',
      quantityUsed: usedQty,
      filename: 'system-user', // ya jo bhi dynamic value ho
    });

    return updated;
  }
  async filterBarcodes(query: BarcodeFilterDto) {
    const { materialName, urgencyLevel, expired, page = 1, limit = 10 } = query;
    const qb = this.barcodeRepo.createQueryBuilder('barcode');

    if (materialName) {
      qb.andWhere('LOWER(barcode.materialName) LIKE LOWER(:name)', {
        name: `%${materialName}%`,
      });
    }

    if (urgencyLevel) {
      qb.andWhere('LOWER(barcode.urgencyLevel) = LOWER(:urgency)', {
        urgency: urgencyLevel.toLowerCase(),
      });
    }

    if (expired !== undefined) {
      const today = new Date().toISOString().split('T')[0];
      if (expired) {
        qb.andWhere('DATE(barcode.expiryDate) < DATE(:now)', { now: today });
      } else {
        qb.andWhere(
          '(barcode.expiryDate IS NULL OR DATE(barcode.expiryDate) >= DATE(:now))',
          { now: today },
        );
      }
    }

    qb.skip((page - 1) * limit).take(limit);
    return qb.getMany();
  }
}
