import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Coxinha de Frango Bacon',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição do produto',
    example:
      'Coxinha de frango recheada com bacon, acompanha maionese de cenoura.',
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: 'Preço do produto',
    example: '7.00',
  })
  price: number;

  @IsUrl()
  @ApiProperty({
    description: 'Link da imagem do produto',
    example: 'https://twitter.com/karolicias/status/1225789400103211009',
  })
  image: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id da categoria do produto',
    example: '08cf6bcd-9ce2-4d7b-8982-3b5b3fe601d5',
  })
  categoryId: string;
}
