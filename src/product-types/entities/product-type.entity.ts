import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';

export class ProductTypeEntity implements ProductType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
