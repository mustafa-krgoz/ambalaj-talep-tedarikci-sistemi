import { IsUUID, IsEnum } from 'class-validator';
import { SupplierResponseStatus } from '../enums/supplier-response-status.enum';

export class CreateSupplierResponseDto {
  @IsUUID()
  supplierId: string;

  @IsUUID()
  packagingRequestId: string;

  @IsEnum(SupplierResponseStatus)
  status: SupplierResponseStatus;
}