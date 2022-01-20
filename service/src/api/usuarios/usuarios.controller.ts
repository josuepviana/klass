import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Usuario as UsuarioModel } from '@prisma/client';
import { UsuarioService } from '../../domain/usuario.service';
import { HashingService } from '../../auth/hashing.service';

@Controller('usuarios')
export class UsuariosController {

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly hashingService: HashingService) { }


  @Post()
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
