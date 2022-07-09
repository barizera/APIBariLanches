import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from './entities/product.entity';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { FavoriteProductDto } from '../favorites/dto/favorite.dto';
import { Favorite } from 'src/favorites/entity/favorite.entity';
import { User } from 'src/Users/entity/users.entity';

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

  async findUsersLiked(id: string) {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });
    return this.prisma.favorite.findMany({
      where: { productName: product.name },
      select: {
        productName: true,
        user: { select: { name: true, email: true } },
      },
    });
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

  async favorite(dto: FavoriteProductDto): Promise<Favorite> {
    const product: Product = await this.prisma.product.findUnique({
      where: { name: dto.productName },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto de nome '${dto.productName}' não encontrado`,
      );
    }

    const user: User = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Entrada de id '${dto.userId}' não encontrada`,
      );
    }

    return this.prisma.favorite.create({ data: dto });
  }

  async unfav(id: string) {
    const verifyIdAndReturnFavorite = await this.prisma.favorite.findUnique({
      where: { id },
    });

    if (!verifyIdAndReturnFavorite) {
      throw new NotFoundException(
        `A entrada de Id '${id}' não foi localizada.`,
      );
    }

    return this.prisma.favorite.delete({ where: { id } });
  }

  //Validation Functions
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
