import { Test, TestingModule } from '@nestjs/testing';
import { SupplierResponseService } from './supplier-response.service';

describe('SupplierResponseService', () => {
  let service: SupplierResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierResponseService],
    }).compile();

    service = module.get<SupplierResponseService>(SupplierResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
