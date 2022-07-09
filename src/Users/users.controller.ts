import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entity/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de User',
  })
  create(@Body() dto: CreateUserDto): Promise<User | void> {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista de todos os Users',
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista de usuário por ID.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualização do User.',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User | void> {
    return this.usersService.upate(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um usuário',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
