import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { MaterialType } from '../enum/material-type.enum';
import { UrgencyLevel } from '../enum/urgency-level.enum';

export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(MaterialType)
  materialType?: MaterialType;

  @IsOptional()
  @IsString()
  unitOfMeasure?: string;

  @IsOptional()
  @IsString()
  containerLabel?: string;

  @IsOptional()
  @IsNumber()
  quantityPerContainer?: number;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsEnum(UrgencyLevel)
  urgencyLevel?: UrgencyLevel;
}
