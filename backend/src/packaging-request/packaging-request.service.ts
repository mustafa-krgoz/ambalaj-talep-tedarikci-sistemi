import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PackagingRequest } from './entities/packaging-request.entity';
import { CreatePackagingRequestDto } from './dto/create-packaging-request.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PackagingRequestService {
  constructor(
    @InjectRepository(PackagingRequest)
    private readonly packagingRequestRepository: Repository<PackagingRequest>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
}