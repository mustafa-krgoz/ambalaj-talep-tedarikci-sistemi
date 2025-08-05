import {
  IsUUID,
  IsString,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreatePackagingRequestDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  productTypeId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  preferredSupplier?: string;

  @IsOptional()
  @IsString()
  additionalDetails?: string;
}
