import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}

  async create(dto: CreateProductTypeDto): Promise<ProductType> {
    const newProductType = this.productTypeRepository.create(dto); // dto → entity
    return await this.productTypeRepository.save(newProductType);  // DB'ye kayıt
  }

  async findAll(): Promise<ProductType[]> {
    return this.productTypeRepository.find();
  }
}