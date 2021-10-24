import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { Faculdade as FaculdadeModel, Usuario as UsuarioModel } from '@prisma/client';
import { AppService } from './app.service';
import { FaculdadeService } from './global/faculdade.service';
import { HashingService } from './global/hashing.service';
import { UsuarioService } from './global/usuario.service';


@Controller({})
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly faculdadeService: FaculdadeService,
    private readonly usuarioService: UsuarioService,
    private readonly hashingService: HashingService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('faculdades')
  async getFaculdades(): Promise<FaculdadeModel[]> {
    return this.faculdadeService.faculdades({});
  }

  @Post('usuarios')
  async postUsuario(
    @Body() usuarioBody: { username, email, password, nome, sobrenome, data_nascimento, faculdade, curso }
  ): Promise<UsuarioModel> {

    const dataNascimento = new Date(usuarioBody.data_nascimento);

    dataNascimento.setTime(dataNascimento.getTime() + dataNascimento.getTimezoneOffset() * 60 * 1000);
    
    return this.usuarioService.createUser({
      ...usuarioBody,
      password: await this.hashingService.bcrypt(usuarioBody.password),
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
