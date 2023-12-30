import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Gender } from '../entities/employee.entity';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  hiredAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  positionId: number;
}
