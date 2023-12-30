import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(account: string) {
    return this.prisma.admin.findFirst({
      where: {
        account,
      },
    });
  }

  async findAll() {
    return this.prisma.admin.findMany();
  }
}
