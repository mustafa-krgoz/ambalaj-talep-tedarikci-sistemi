import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { PackagingRequestService } from './packaging-request.service';
import { CreatePackagingRequestDto } from './dto/create-packaging-request.dto';
import { PackagingRequest } from './entities/packaging-request.entity';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('packaging-request')
@UseGuards(JwtAuthGuard, RolesGuard) // tüm controller'a uygula
export class PackagingRequestController {
  constructor(private readonly packagingRequestService: PackagingRequestService) {}

  // ✅ SADECE CUSTOMER ROLÜ OLUŞTURABİLİR
  @Post()
  @Roles('customer')
  create(@Body() dto: CreatePackagingRequestDto): Promise<PackagingRequest> {
    return this.packagingRequestService.create(dto);
  }

  // ✅ HERKES GÖRÜNTÜLEYEBİLİR
  @Get()
  findAll(): Promise<PackagingRequest[]> {
    return this.packagingRequestService.findAll();
  }

  // ✅ SADECE İLGİLİ MÜŞTERİ KENDİ TALEPLERİNİ GÖRÜR
  @Get('my-requests')
  @Roles('customer')
  async findMyRequests(@Query('userId') userId: string) {
    return this.packagingRequestService.findByCustomerId(userId);
  }

  // ✅ TEDARİKÇİ TALEPLERİ FİLTRELEYEBİLİR
  @Get('filtered')
  @Roles('supplier')
  async findFiltered(
    @Query('productTypeId') productTypeId?: string,
    @Query('supplierId') supplierId?: string,
  ) {
    return this.packagingRequestService.findFiltered(productTypeId, supplierId);
  }
}