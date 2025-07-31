import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductType } from './entities/product-type.entity';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  // ✅ POST /product-type
  @Post()
  create(@Body() createProductTypeDto: CreateProductTypeDto): Promise<ProductType> {
    return this.productTypeService.create(createProductTypeDto);
  }

  // ✅ GET /product-type
  @Get()
  findAll(): Promise<ProductType[]> {
    return this.productTypeService.findAll();
  }
}
