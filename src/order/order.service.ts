import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    console.log(dto);
    const data: Prisma.OrderCreateInput = {
      table: {
        connect: {
          number: dto.tableNumber,
        },
      },
      user: {
        connect: {
          id: dto.userId,
        },
      },
      products: {
        connect: dto.products.map((element) => ({ id: element })),
      },
    };
    return this.prisma.order.create({
      data,
      select: {
        id: true,
        createAt: true,
        tableNumber: true,
        userId: true,
        products: { select: { name: true } },
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        table: {
          select: {
            number: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        products: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        table: {
          select: {
            number: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        products: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
