import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PackagingRequestService } from '../packaging-request/packaging-request.service';
import { SupplierResponseService } from '../supplier-response/supplier-response.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly packagingRequestService: PackagingRequestService,
    private readonly supplierResponseService: SupplierResponseService,
  ) {}

  // ✅ Tüm kullanıcıları getir
  @Get('users')
  async findAllUsers(@Query('role') role?: string) {
    const users = await this.userService.findAll();

    // Eğer role query parametresi varsa filtrele (örnek: ?role=supplier)
    if (role) {
      return users
        .filter(user => user.role === role)
        .map(({ password, ...rest }) => rest); // Şifreyi dışarıda bırak
    }

    // Şifreyi çıkarmak istiyorsan:
    return users.map(({ password, ...rest }) => rest);
  }

  // ✅ Tüm talepleri getir
  @Get('requests')
  async findAllRequests() {
    return this.packagingRequestService.findAll();
  }

  // ✅ Tüm tedarikçi yanıtlarını getir
  @Get('responses')
  async findAllResponses() {
    return this.supplierResponseService.findAll();
  }
}