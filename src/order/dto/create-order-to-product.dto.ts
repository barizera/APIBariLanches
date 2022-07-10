import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderToProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do produto sendo pedido.',
    example: '5244e426-9adf-4d6f-b7d7-96df4eaadedb',
  })
  productId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Quantidade do produto a ser pedido.',
    example: '5244e426-9adf-4d6f-b7d7-96df4eaadedb',
  })
  quantity: number;
}
