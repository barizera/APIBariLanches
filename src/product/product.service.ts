import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from './entities/product.entity';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<Product | void> {
    return await this.prisma.product
      .create({ data: dto })
      .catch(handleErrorConstraintUnique);
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.verifyIdAndReturnProduct(id);
  }

  async update(id: string, dto: UpdateProductDto) {
    return await this.prisma.product
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnProduct(id);
    return this.prisma.product.delete({ where: { id } });
  }

  //Validations Functions
  async verifyIdAndReturnProduct(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `A entrada de Id '${id}' não foi localizada.`,
      );
    }
    return product;
  }
}
