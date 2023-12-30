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
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductTypeEntity } from './entities/product-type.entity';
import { ProductTypesService } from './product-types.service';

class ResponseProductTypeDto extends withBaseResponse(
  ProductTypeEntity,
  {},
  true,
) {}
class ResponseSingleProductTypeDto extends withBaseResponse(
  ProductTypeEntity,
  {},
) {}

@Controller('product-types')
@ApiTags('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseSingleProductTypeDto })
  create(@Body() createProductDto: CreateProductTypeDto) {
    return this.productTypesService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseProductTypeDto })
  findAll() {
    return this.productTypesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseSingleProductTypeDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productTypesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseSingleProductTypeDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.productTypesService.update(id, updateProductTypeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseSingleProductTypeDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productTypesService.remove(id);
  }
}
