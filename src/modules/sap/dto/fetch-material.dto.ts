import { IsOptional, IsString } from 'class-validator';

export class FetchMaterialDto {
  @IsOptional()
  @IsString()
  materialType?: string;

  @IsOptional()
  @IsString()
  searchKeyword?: string;
}
