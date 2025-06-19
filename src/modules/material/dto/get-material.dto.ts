import { IsOptional, IsString, IsEnum } from 'class-validator';

export class GetMaterialDto {
  @IsOptional()
  @IsEnum(['solid', 'liquid', 'roll', 'tool'])
  materialType?: 'solid' | 'liquid' | 'roll' | 'tool';

  @IsOptional()
  @IsString()
  unitOfMeasure?: string;
}
