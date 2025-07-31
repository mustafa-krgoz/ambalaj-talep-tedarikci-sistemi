import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  
  @Entity()
  export class PackagingRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User, (user) => user.id)
    customer: User; // sadece CUSTOMER rolündeki kullanıcılar talep oluşturabilir
  
    @Column({ type: 'jsonb' })
    items: {
      productTypeId: string;
      quantity: number;
    }[];
  
    @CreateDateColumn()
    createdAt: Date;
  }
