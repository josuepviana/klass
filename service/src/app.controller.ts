import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Usuario as UsuarioModel } from '@prisma/client';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { HashingService } from './auth/hashing.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsuarioService } from './domain/usuario.service';


@Controller({})
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly usuarioService: UsuarioService,
    private readonly hashingService: HashingService,
    private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('usuarios')
  async postUsuario(
    @Body() usuarioBody: { username, email, password, nome, sobrenome, data_nascimento, faculdade, curso }
  ): Promise<UsuarioModel> {

    const dataNascimento = new Date(usuarioBody.data_nascimento);

    dataNascimento.setTime(dataNascimento.getTime() + dataNascimento.getTimezoneOffset() * 60 * 1000);
    
    return this.usuarioService.createUser({
      ...usuarioBody,
      password: await this.hashingService.encrypt(usuarioBody.password),
      data_nascimento: dataNascimento,
      faculdade: {
        connect: {
          id: usuarioBody.faculdade
        }
      },
      curso: {
        connect: {
          id: usuarioBody.curso
        }
      },
    });
  }
}
