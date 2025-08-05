// src/auth/dto/register.dto.ts

import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    IsEnum,
  } from 'class-validator';
  import { UserRole } from '../../user/enums/user-role.enum';
  
  export class RegisterDto {
    @IsNotEmpty({ message: 'Ad soyad zorunludur' })
    @IsString()
    fullName: string;
  
    @IsNotEmpty({ message: 'Email zorunludur' })
    @IsEmail()
    email: string;
  
    @IsNotEmpty({ message: 'Şifre zorunludur' })
    @MinLength(8, { message: 'Şifre en az 8 karakter olmalıdır' })
    password: string;
  
    @IsOptional()
    @IsString()
    companyName?: string;
  
    @IsOptional()
    @IsEnum(UserRole, { message: 'Geçersiz rol değeri' })
    role?: UserRole; // → opsiyonel, default olarak customer atanır
  }