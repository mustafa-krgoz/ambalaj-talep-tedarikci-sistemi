import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PackagingRequestService } from './packaging-request.service';
import { CreatePackagingRequestDto } from './dto/create-packaging-request.dto';
import { PackagingRequest } from './entities/packaging-request.entity';

@Controller('packaging-request')
export class PackagingRequestController {
  constructor(private readonly packagingRequestService: PackagingRequestService) {}


  @Post()
  create(@Body() dto: CreatePackagingRequestDto): Promise<PackagingRequest> {
    return this.packagingRequestService.create(dto);
  }


  @Get()
  findAll(): Promise<PackagingRequest[]> {
    return this.packagingRequestService.findAll();
  }


  @Get('my-requests')
  async findMyRequests(@Query('userId') userId: string) {
    return this.packagingRequestService.findByCustomerId(userId);
  }


  @Get('filtered')
  async findFiltered(
    @Query('productTypeId') productTypeId?: string,
    @Query('supplierId') supplierId?: string,
  ) {
    return this.packagingRequestService.findFiltered(productTypeId, supplierId);
  }
}