import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { withBaseResponse } from '../interceptors/transform.interceptor';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { EmployeeEntity } from './entities/employee.entity';

class ResponseEmployeeDto extends withBaseResponse(EmployeeEntity, {}, true) {}
class ResponseSingleEmployeeDto extends withBaseResponse(EmployeeEntity, {}) {}

@Controller('employees')
@ApiTags('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseSingleEmployeeDto })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseEmployeeDto })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseSingleEmployeeDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseSingleEmployeeDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseSingleEmployeeDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(id);
  }
}
