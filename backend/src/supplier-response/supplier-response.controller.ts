import { Controller, Post, Body, Get } from '@nestjs/common';
import { SupplierResponseService } from './supplier-response.service';
import { CreateSupplierResponseDto } from './dto/create-supplier-response.dto';
import { SupplierResponse } from './entities/supplier-response.entity';

@Controller('supplier-response')
export class SupplierResponseController {
  constructor(private readonly supplierResponseService: SupplierResponseService) {}

  // ✅ POST /supplier-response
  @Post()
  create(@Body() dto: CreateSupplierResponseDto): Promise<SupplierResponse> {
    return this.supplierResponseService.create(dto);
  }

  // ✅ GET /supplier-response
  @Get()
  findAll(): Promise<SupplierResponse[]> {
    return this.supplierResponseService.findAll();
  }
}