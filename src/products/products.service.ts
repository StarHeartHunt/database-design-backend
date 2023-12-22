import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const productType = await this.prisma.productType.findUnique({
      where: {
        id: createProductDto.productTypeId,
      },
    });
    const supplier = await this.prisma.supplier.findUnique({
      where: {
        id: createProductDto.supplierId,
      },
    });

    if (!productType || !supplier)
      throw new UnprocessableEntityException(
        `Product type or supplier not created. Found productType: ${productType}, supplier: ${supplier}`,
      );

    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
