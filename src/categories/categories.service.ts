import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category
      .create({ data: dto })
      .catch(handleErrorConstraintUnique);
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  findOne(id: string) {
    return this.verifyIdAndReturnCategory(id);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.verifyIdAndReturnCategory(id);
    return this.prisma.category
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnCategory(id);
    return this.prisma.category.delete({ where: { id } });
  }

  async verifyIdAndReturnCategory(id: string): Promise<Category> {
    const category: Category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(
        `A entrada de Id '${id}' não foi localizada.`,
      );
    }
    return category;
  }
}
