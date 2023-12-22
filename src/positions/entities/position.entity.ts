import { ApiProperty } from '@nestjs/swagger';
import { Position } from '@prisma/client';

export class PositionEntity implements Position {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
