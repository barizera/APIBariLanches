import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FavoriteProductDto } from '../favorites/dto/favorite.dto';
import { Favorite } from 'src/favorites/entity/favorite.entity';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação do Produto.',
  })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista de todos os Produtos.',
  })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Produto selecionado.',
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get(':id/user-liked')
  @ApiOperation({
    summary: 'Lista de usuários que tem o produto do id favoritado.',
  })
  findUsersLiked(@Param('id') id: string) {
    return this.productService.findUsersLiked(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um Produto.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um Produto.',
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Post('favorite')
  @ApiOperation({
    summary: 'Favoritar um produto.',
  })
  favorite(@Body() dto: FavoriteProductDto): Promise<Favorite> {
    return this.productService.favorite(dto);
  }

  @Delete('/favorite/:id')
  @ApiOperation({
    summary: 'Desfavoritar o produto.',
  })
  unfav(@Param('id') id: string) {
    return this.productService.unfav(id);
  }
}
