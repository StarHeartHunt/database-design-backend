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
import { CreateStockInfoDto } from './dto/create-stock-info.dto';
import { UpdateStockInfoDto } from './dto/update-stock-info.dto';
import { StockInfoEntity } from './entities/stock-info.entity';
import { StockInfosService } from './stock-info.service';

class ResponseStockInfoDto extends withBaseResponse(
  StockInfoEntity,
  {},
  true,
) {}
class ResponseSingleStockInfoDto extends withBaseResponse(
  StockInfoEntity,
  {},
) {}

@Controller('stock-infos')
@ApiTags('stock-infos')
export class StockInfosController {
  constructor(private readonly stockInfosService: StockInfosService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseSingleStockInfoDto })
  async create(@Body() createStockInfoDto: CreateStockInfoDto) {
    return await this.stockInfosService.create(createStockInfoDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseStockInfoDto })
  findAll() {
    return this.stockInfosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseSingleStockInfoDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockInfosService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseSingleStockInfoDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockInfoDto: UpdateStockInfoDto,
  ) {
    return this.stockInfosService.update(id, updateStockInfoDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseSingleStockInfoDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockInfosService.remove(id);
  }
}
