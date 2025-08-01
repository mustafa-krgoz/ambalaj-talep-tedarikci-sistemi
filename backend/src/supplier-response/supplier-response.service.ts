import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplierResponse } from './entities/supplier-response.entity';
import { CreateSupplierResponseDto } from './dto/create-supplier-response.dto';
import { User } from '../user/entities/user.entity';
import { PackagingRequest } from '../packaging-request/entities/packaging-request.entity';
import { UserRole } from '../user/enums/user-role.enum';
import { maskName } from '../utils/mask-name'; // bunu da ekle

@Injectable()
export class SupplierResponseService {
  constructor(
    @InjectRepository(SupplierResponse)
    private readonly supplierResponseRepository: Repository<SupplierResponse>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(PackagingRequest)
    private readonly packagingRequestRepository: Repository<PackagingRequest>,
  ) {}

  async create(createDto: CreateSupplierResponseDto) {
    const supplier = await this.userRepository.findOne({
      where: { id: createDto.supplierId },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier user not found');
    }

    if (supplier.role !== UserRole.SUPPLIER) {
      throw new BadRequestException('Only users with SUPPLIER role can respond');
    }

    const packagingRequest = await this.packagingRequestRepository.findOne({
      where: { id: createDto.packagingRequestId },
    });

    if (!packagingRequest) {
      throw new NotFoundException('Packaging request not found');
    }

    const response = this.supplierResponseRepository.create({
      supplier,
      packagingRequest,
      status: createDto.status,
    });

    return await this.supplierResponseRepository.save(response);
  }

  async findAll(): Promise<any[]> {
    const responses = await this.supplierResponseRepository.find({
      relations: ['supplier', 'packagingRequest'],
    });

    return responses.map((response) => {
      const supplier = { ...(response.supplier as any) };
      supplier.fullName = maskName(supplier.fullName);
      delete supplier.password;
    
      return {
        ...response,
        supplier,
      };
    });
  }
}