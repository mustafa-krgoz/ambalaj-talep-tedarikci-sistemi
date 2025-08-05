import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { PackagingRequest } from '../../packaging-request/entities/packaging-request.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ nullable: true }) // sadece supplier'lar için olabilir
  companyName?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ✅ İLGİLİ: Kullanıcının ambalaj talepleri
  @OneToMany(() => PackagingRequest, (request) => request.customer)
  requests: PackagingRequest[];
}