import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
