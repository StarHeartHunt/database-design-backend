import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from '@prisma/client';

export class SupplierEntity implements Supplier {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  contact: string;
}
