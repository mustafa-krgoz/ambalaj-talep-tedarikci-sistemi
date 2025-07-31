import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PackagingRequestService } from './packaging-request.service';
import { PackagingRequestController } from './packaging-request.controller';

import { PackagingRequest } from './entities/packaging-request.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackagingRequest, User])],
  controllers: [PackagingRequestController],
  providers: [PackagingRequestService],
})
export class PackagingRequestModule {}
