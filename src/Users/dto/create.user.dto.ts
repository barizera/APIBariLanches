import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Bari',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'bari@lanches.com',
  })
  email: string;
}
