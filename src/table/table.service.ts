import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Table } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTableDto): Promise<Table> {
    return await this.prisma.table
      .create({ data: dto })
      .catch(this.handleErrorConstraintUnique);
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  findOne(id: string) {
    return this.verifyIdAndReturnTable(id);
  }

  async update(id: string, dto: UpdateTableDto) {
    await this.verifyIdAndReturnTable(id);
    return this.prisma.table
      .update({ where: { id }, data: dto })
      .catch(this.handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnTable(id);
    return this.prisma.table.delete({ where: { id } });
  }

  //VALIDATIONS
  async verifyIdAndReturnTable(id: string): Promise<Table> {
    const table: Table = await this.prisma.table.findUnique({ where: { id } });

    if (!table) {
      throw new NotFoundException(
        `A entrada de Id '${id}' não foi localizada.`,
      );
    }
    return table;
  }

  handleErrorConstraintUnique(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMessage = `O Id '${
      splitedMessage[splitedMessage.length - 2]
    }' não está respeitando a constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMessage);
  }
}
