import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateOrderDto) {
    console.log(dto);
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },
      table: {
        connect: {
          number: dto.tableNumber,
        },
      },
      products: {
        createMany: {
          data: dto.products.map((element) => ({
            productId: element.productId,
            quantity: element.quantity,
          })),
        },
      },
    };
    return this.prisma.order.create({
      data,
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
            product: {
              select: {
                name: true,
              },
            },
          },
        },
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
            product: {
              select: {
                name: true,
              },
            },
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
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
