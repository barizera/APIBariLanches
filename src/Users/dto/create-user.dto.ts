import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

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
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  @ApiProperty({
    example: '@Abc12345',
    description:
      'Senha do usuário a ser criado. Mínimo de uma letra maiúscula, uma minúscula, um símbolo e um número.',
  })
  password: string;
}
