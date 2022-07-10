import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

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

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: `Lista de id's dos produtos que foram pedidos.`,
    example: [
      '5244e426-9adf-4d6f-b7d7-96df4eaadedb',
      'ba76d467-d709-4009-b55f-f81dfbe5262d',
    ],
  })
  products: string[];
}
