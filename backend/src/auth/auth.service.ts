import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../user/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email, true);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email, true);

    if (!user) throw new UnauthorizedException('Kullanıcı bulunamadı');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Şifre yanlış');

    const payload = { sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }
    };
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.userService.findByEmail(registerDto.email);
    if (existing) throw new BadRequestException('Bu email ile zaten kayıtlı bir kullanıcı var');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const createdUser = await this.userService.create({
      fullName: registerDto.fullName,
      email: registerDto.email,
      password: hashedPassword,
      companyName: registerDto.companyName,
      role: registerDto.role || UserRole.CUSTOMER, // default: customer
    });

    const payload = { sub: createdUser.id, role: createdUser.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: createdUser.id,
        fullName: createdUser.fullName,
        email: createdUser.email,
        role: createdUser.role,
      }
    };
  }
}