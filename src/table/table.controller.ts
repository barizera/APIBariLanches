import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Table } from '@prisma/client';

@ApiTags('tables')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @ApiOperation({
    summary: 'Crie uma nova mesa',
  })
  create(@Body() dto: CreateTableDto): Promise<Table> {
    return this.tableService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as mesas.',
  })
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar 1 Table',
  })
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar uma Table',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTableDto,
  ): Promise<Table | void> {
    return this.tableService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar uma Table',
  })
  remove(@Param('id') id: string) {
    return this.tableService.remove(id);
  }
}
