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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './orders.service';

class ResponseOrderDto extends withBaseResponse(OrderEntity, {}, true) {}
class ResponseSingleOrderDto extends withBaseResponse(OrderEntity, {}) {}

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponseSingleOrderDto })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseOrderDto })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseSingleOrderDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseSingleOrderDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseSingleOrderDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
