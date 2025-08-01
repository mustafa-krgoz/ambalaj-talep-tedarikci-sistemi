import { Controller, Post, Body, Get } from '@nestjs/common';
import { PackagingRequestService } from './packaging-request.service';
import { CreatePackagingRequestDto } from './dto/create-packaging-request.dto';
import { PackagingRequest } from './entities/packaging-request.entity';
import { Query } from '@nestjs/common';

@Controller('packaging-request')
export class PackagingRequestController {
  constructor(private readonly packagingRequestService: PackagingRequestService) {}

  // ✅ POST /packaging-request
  @Post()
  create(@Body() dto: CreatePackagingRequestDto): Promise<PackagingRequest> {
    return this.packagingRequestService.create(dto);
  }

  // ✅ GET /packaging-request
  @Get()
  findAll(): Promise<PackagingRequest[]> {
    return this.packagingRequestService.findAll();
  }

  @Get('my-requests')
  async findMyRequests(@Query('userId') userId: string) {
  return this.packagingRequestService.findByCustomerId(userId);
  }
}
