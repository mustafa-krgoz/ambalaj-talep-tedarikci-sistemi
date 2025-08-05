import { IsEmail, IsNotEmpty, IsString, IsEnum, ValidateIf } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf(o => o.role === UserRole.SUPPLIER)
  @IsString()
  @IsNotEmpty()
  companyName?: string;
}