import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StockInfosController } from './stock-info.controller';
import { StockInfosService } from './stock-info.service';

@Module({
  controllers: [StockInfosController],
  providers: [StockInfosService],
  imports: [PrismaModule],
})
export class StockInfosModule {}
