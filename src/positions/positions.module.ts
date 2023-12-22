import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [PrismaModule],
})
export class PositionsModule {}
