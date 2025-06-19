import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Query,
} from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { ScanBarcodeDto } from './dto/scan-barcode.dto';
import { BarcodeFilterDto } from './dto/barcode-filter.dto';

@Controller('barcode')
export class BarcodeController {
  constructor(private readonly barcodeService: BarcodeService) {}

  @Post()
  create(@Body() dto: CreateBarcodeDto) {
    return this.barcodeService.generateBarcode(dto);
  }

  @Patch(':id/use/:qty')
  use(@Param('id') id: string, @Param('qty') qty: string) {
    return this.barcodeService.useBarcode(id, parseInt(qty));
  }

  @Get(':id/available')
  getAvailable(@Param('id') id: string) {
    return this.barcodeService.getAvailableQty(id);
  }

  @Get('urgent')
  urgentBarcodes() {
    return this.barcodeService.getUrgentBarcodes();
  }

  @Post('scan')
  scan(@Body() dto: ScanBarcodeDto) {
    return this.barcodeService.scanBarcode(dto);
  }
  @Get()
  filterBarcodes(@Query() query: BarcodeFilterDto) {
    return this.barcodeService.filterBarcodes(query);
  }
}
