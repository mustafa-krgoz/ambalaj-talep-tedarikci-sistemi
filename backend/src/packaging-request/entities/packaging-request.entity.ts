import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProductType } from '../../product-type/entities/product-type.entity';

@Entity()
export class PackagingRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Talebi yapan kullanıcı
  @ManyToOne(() => User, (user) => user.requests, { eager: true })
  customer: User;

  // Ürün tipi ilişkisi (opsiyonel değilse eager ekleyebilirsin)
  @ManyToOne(() => ProductType, { eager: true })
  productType: ProductType;

  // Adet bilgisi
  @Column({ type: 'int' })
  quantity: number;

  // Opsiyonel: tercih edilen tedarikçi
  @Column({ type: 'text', nullable: true })
  preferredSupplier?: string;

  // Opsiyonel: ekstra açıklama
  @Column({ type: 'text', nullable: true })
  additionalDetails?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}