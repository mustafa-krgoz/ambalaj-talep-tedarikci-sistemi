import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierResponseDto } from './create-supplier-response.dto';

export class UpdateSupplierResponseDto extends PartialType(CreateSupplierResponseDto) {}
