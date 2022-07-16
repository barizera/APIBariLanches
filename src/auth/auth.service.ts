import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos.');
    }

    const hashValid = await bcrypt.compare(password, user.password);
    if (!hashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos.');
    }
    delete user.password;

    const token: string = this.jwtService.sign({ email });

    return {
      token,
      user,
    };
  }
}
