import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class ProductType {
    @PrimaryGeneratedColumn('uuid')
    id: string; // her ürün tipine özel benzersiz ID
  
    @Column({ unique: true })
    name: string; // örnek: "Karton Kutu"
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
