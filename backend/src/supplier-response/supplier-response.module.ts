import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierResponseService } from './supplier-response.service';
import { SupplierResponseController } from './supplier-response.controller';
import { SupplierResponse } from './entities/supplier-response.entity';
import { User } from '../user/entities/user.entity';
import { PackagingRequest } from '../packaging-request/entities/packaging-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierResponse, User, PackagingRequest]),
  ],
  controllers: [SupplierResponseController],
  providers: [SupplierResponseService],
  exports: [SupplierResponseService],
})
export class SupplierResponseModule {}
