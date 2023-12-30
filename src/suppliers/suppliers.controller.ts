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
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierEntity } from './entities/supplier.entity';
import { SuppliersService } from './suppliers.service';

class ResponseSupplierDto extends withBaseResponse(SupplierEntity, {}, true) {}
class ResponseSingleSupplierDto extends withBaseResponse(SupplierEntity, {}) {}

@Controller('suppliers')
@ApiTags('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseSingleSupplierDto })
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return await this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseSupplierDto })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseSingleSupplierDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseSingleSupplierDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseSingleSupplierDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.remove(id);
  }
}
