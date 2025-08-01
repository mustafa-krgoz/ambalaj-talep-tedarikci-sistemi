import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { PackagingRequestModule } from '../packaging-request/packaging-request.module';
import { SupplierResponseModule } from '../supplier-response/supplier-response.module';

@Module({
  imports: [
    UserModule,
    PackagingRequestModule,
    SupplierResponseModule,
  ],
  controllers: [AdminController],
})
export class AdminModule {}