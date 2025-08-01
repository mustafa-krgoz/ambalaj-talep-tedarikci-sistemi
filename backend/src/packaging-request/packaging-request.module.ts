import { Module } from '@nestjs/common';
import { PackagingRequestService } from './packaging-request.service';
import { PackagingRequestController } from './packaging-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagingRequest } from './entities/packaging-request.entity';
import { User } from '../user/entities/user.entity';
import { SupplierResponse } from '../supplier-response/entities/supplier-response.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PackagingRequest,
      User,
      SupplierResponse,
    ]),
  ],
  controllers: [PackagingRequestController],
  providers: [PackagingRequestService],
  exports: [PackagingRequestService],
})
export class PackagingRequestModule {}