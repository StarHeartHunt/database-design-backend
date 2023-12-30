import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Injectable()
export class ProductTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    return this.prisma.productType.create({
      data: createProductTypeDto,
    });
  }

  findAll() {
    return this.prisma.productType.findMany();
  }

  findOne(id: number) {
    return this.prisma.productType.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return this.prisma.productType.update({
      where: {
        id,
      },
      data: updateProductTypeDto,
    });
  }

  remove(id: number) {
    return this.prisma.productType.delete({
      where: {
        id,
      },
    });
  }
}
