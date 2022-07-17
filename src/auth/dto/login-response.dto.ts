import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/Users/entity/users.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example: 'TOKEN_GERADO_PELO_AUTH',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado.',
  })
  user: User;
}
