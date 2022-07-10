import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderToProductDto } from './create-order-to-product.dto';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Número da mesa que realizou o pedido.',
    example: 5,
  })
  tableNumber: number;

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que realizou o pedido.',
    example: '3e237437-81fe-4e2d-bee5-ec96b0d763dd',
  })
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderToProductDto)
  @ApiProperty({
    description: `Lista de id's e quantidades dos produtos que foram pedidos.`,
    example: [
      { productId: '5244e426-9adf-4d6f-b7d7-96df4eaadedb', quantity: 2 },
      { productId: 'ba76d467-d709-4009-b55f-f81dfbe5262d', quantity: 3 },
    ],
  })
  products: CreateOrderToProductDto[];
}
