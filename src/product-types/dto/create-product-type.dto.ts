import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
