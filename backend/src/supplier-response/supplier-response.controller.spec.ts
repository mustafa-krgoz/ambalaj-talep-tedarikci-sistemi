import { Test, TestingModule } from '@nestjs/testing';
import { SupplierResponseController } from './supplier-response.controller';
import { SupplierResponseService } from './supplier-response.service';

describe('SupplierResponseController', () => {
  let controller: SupplierResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierResponseController],
      providers: [SupplierResponseService],
    }).compile();

    controller = module.get<SupplierResponseController>(SupplierResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
