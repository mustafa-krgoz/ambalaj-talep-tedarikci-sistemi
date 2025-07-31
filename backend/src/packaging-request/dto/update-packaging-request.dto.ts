import { PartialType } from '@nestjs/mapped-types';
import { CreatePackagingRequestDto } from './create-packaging-request.dto';

export class UpdatePackagingRequestDto extends PartialType(CreatePackagingRequestDto) {}
