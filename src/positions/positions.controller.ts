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
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionEntity } from './entities/position.entity';
import { PositionsService } from './positions.service';
// import { withBaseResponse } from 'src/interceptors/transform.interceptor';

// class ResponsePositionDto extends withBaseResponse(PositionEntity, {}) {}

@Controller('positions')
@ApiTags('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @ApiCreatedResponse({ type: PositionEntity })
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  @ApiOkResponse({ type: PositionEntity, isArray: true })
  findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PositionEntity })
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PositionEntity })
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PositionEntity })
  remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }
}
