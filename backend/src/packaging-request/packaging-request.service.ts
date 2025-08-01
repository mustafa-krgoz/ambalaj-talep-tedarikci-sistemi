import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PackagingRequest } from './entities/packaging-request.entity';
import { CreatePackagingRequestDto } from './dto/create-packaging-request.dto';
import { User } from '../user/entities/user.entity';
import { SupplierResponse } from '../supplier-response/entities/supplier-response.entity';

@Injectable()
export class PackagingRequestService {
  constructor(
    @InjectRepository(PackagingRequest)
    private readonly packagingRequestRepository: Repository<PackagingRequest>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(SupplierResponse)
    private readonly supplierResponseRepository: Repository<SupplierResponse>,
  ) {}

  async create(dto: CreatePackagingRequestDto): Promise<PackagingRequest> {
    const user = await this.userRepository.findOne({
      where: { id: dto.customerId },
    });

    if (!user) {
      throw new NotFoundException('Customer not found');
    }

    const request = this.packagingRequestRepository.create({
      customer: user,
      items: dto.items,
    });

    return await this.packagingRequestRepository.save(request);
  }

  async findAll(): Promise<PackagingRequest[]> {
    return this.packagingRequestRepository.find({
      relations: ['customer'],
    });
  }

  async findByCustomerId(customerId: string): Promise<PackagingRequest[]> {
    return this.packagingRequestRepository.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }

  async findFiltered(
    productTypeId?: string,
    supplierId?: string,
  ): Promise<(PackagingRequest & { responseStatus: 'interested' | 'not_interested' | null })[]> {
    const allRequests = await this.packagingRequestRepository.find({
      relations: ['customer'],
    });

    const filtered: (PackagingRequest & {
      responseStatus: 'interested' | 'not_interested' | null;
    })[] = [];

    for (const request of allRequests) {
      // Ürün tipi filtreleme
      if (
        productTypeId &&
        !request.items.some((item) => item.productTypeId === productTypeId)
      ) {
        continue;
      }

      // Tedarikçi yanıtı kontrolü
      let responseStatus: 'interested' | 'not_interested' | null = null;

      if (supplierId) {
        const response = await this.supplierResponseRepository.findOne({
          where: {
            packagingRequest: { id: request.id },
            supplier: { id: supplierId },
          },
        });

        if (response) {
          responseStatus = response.status;
        }
      }

      filtered.push({
        ...request,
        responseStatus,
      });
    }

    return filtered;
  }
}