import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { withBaseResponse } from '../interceptors/transform.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

class ResponseProductDto extends withBaseResponse(ProductEntity, {}) {}

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseProductDto, isArray: true })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseProductDto })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseProductDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseProductDto })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
