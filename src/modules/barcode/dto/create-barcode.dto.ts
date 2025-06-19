// src/modules/barcode/dto/create-barcode.dto.ts
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBarcodeDto {
  @IsString()
  materialId: string;

  @IsOptional()
  @IsString()
  materialName?: string;

  @IsNumber({}, { message: 'totalQty must be a number' })
  totalQty: number;

  @IsOptional()
  @IsString()
  urgencyLevel?: string;

  @IsOptional()
  @IsDateString({}, { message: 'expiryDate must be a valid ISO date string' })
  expiryDate?: string;
}
