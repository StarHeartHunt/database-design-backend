import { ApiProperty } from '@nestjs/swagger';
import { StockInfo } from '@prisma/client';

export class StockInfoEntity implements StockInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  purchaseDate: Date;
}
