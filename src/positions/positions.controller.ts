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
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionEntity } from './entities/position.entity';
import { PositionsService } from './positions.service';

class ResponsePositionDto extends withBaseResponse(PositionEntity, {}) {}

@Controller('positions')
@ApiTags('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @ApiCreatedResponse({ type: ResponsePositionDto })
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponsePositionDto, isArray: true })
  findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponsePositionDto })
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponsePositionDto })
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponsePositionDto })
  remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }
}
