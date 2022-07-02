import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Bari',
    description: 'Nome do usuário a ser criado.',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'bari@lanches.com',
    description: 'Email do usuário a ser criado.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '12345',
    description: 'Senha do usuário a ser criado.',
  })
  password: string;
}
