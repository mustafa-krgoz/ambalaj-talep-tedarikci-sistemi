import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  import { PackagingRequest } from '../../packaging-request/entities/packaging-request.entity';
  import { SupplierResponseStatus } from '../enums/supplier-response-status.enum';
  
  @Entity()
  export class SupplierResponse {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User, (user) => user.id)
    supplier: User;
  
    @ManyToOne(() => PackagingRequest, (request) => request.id)
    packagingRequest: PackagingRequest;
  
    @Column({ type: 'enum', enum: SupplierResponseStatus })
    status: SupplierResponseStatus;
  
    @CreateDateColumn()
    respondedAt: Date;
  }