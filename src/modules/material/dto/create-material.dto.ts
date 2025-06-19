import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  name: string;

  @IsEnum(['solid', 'liquid', 'roll', 'tool'])
  materialType: 'solid' | 'liquid' | 'roll' | 'tool';

  @IsString()
  unitOfMeasure: string;

  @IsString()
  containerLabel: string;

  @IsNumber()
  quantityPerContainer: number;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsEnum(['high', 'medium', 'low'])
  urgencyLevel: 'high' | 'medium' | 'low';
}
