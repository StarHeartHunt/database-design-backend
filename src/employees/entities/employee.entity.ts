import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '@prisma/client';

export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export class EmployeeEntity implements Employee {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  hiredAt: Date;

  @ApiProperty()
  positionId: number;
}
