import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './entity/users.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPass = await bcrypt.hash(dto.password, 8);

    const data: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPass,
    };
    return this.prisma.user
      .create({ data })
      .catch(this.handleErrorConstraintUnique);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.verifyIdAndReturnUser(id);
  }

  async upate(id: string, dto: UpdateUserDto): Promise<User | void> {
    await this.verifyIdAndReturnUser(id);

    return this.prisma.user
      .update({ where: { id }, data: dto })
      .catch(this.handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.user.delete({
      where: { id },
      select: { name: true, email: true },
    });
  }

  //Validations Functions
  async verifyIdAndReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        `A entrada de Id '${id}' não foi localizada.`,
      );
    }
    return user;
  }

  handleErrorConstraintUnique(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMessage = `O Id '${
      splitedMessage[splitedMessage.length - 2]
    }' não está respeitando a constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMessage);
  }
}
