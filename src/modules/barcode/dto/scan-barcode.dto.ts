import { IsString, IsNumber } from 'class-validator';

export class ScanBarcodeDto {
  @IsString()
  barcode: string;

  @IsNumber()
  usedQty: number;
}
