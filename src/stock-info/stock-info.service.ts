import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockInfoDto } from './dto/create-stock-info.dto';
import { UpdateStockInfoDto } from './dto/update-stock-info.dto';

@Injectable()
export class StockInfosService {
  constructor(private prisma: PrismaService) {}

  create(createStockInfoDto: CreateStockInfoDto) {
    return this.prisma.stockInfo.create({
      data: createStockInfoDto,
    });
  }

  findAll() {
    return this.prisma.stockInfo.findMany();
  }

  findOne(id: number) {
    return this.prisma.stockInfo.findUnique({ where: { id } });
  }

  update(id: number, updateStockInfoDto: UpdateStockInfoDto) {
    return this.prisma.stockInfo.update({
      where: { id },
      data: updateStockInfoDto,
    });
  }

  remove(id: number) {
    return this.prisma.stockInfo.delete({ where: { id } });
  }
}
