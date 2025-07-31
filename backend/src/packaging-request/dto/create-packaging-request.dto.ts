import {
    IsUUID,
    IsArray,
    ValidateNested,
    IsInt,
    Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class PackagingItemDto {
    @IsUUID()
    productTypeId: string;
  
    @IsInt()
    @Min(1)
    quantity: number;
  }
  
  export class CreatePackagingRequestDto {
    @IsUUID()
    customerId: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PackagingItemDto)
    items: PackagingItemDto[];
  }
