import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class BarcodeFilterDto {
  @IsOptional()
  @IsString()
  materialName?: string;

  @IsOptional()
  @IsString()
  urgencyLevel?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  expired?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;
}
