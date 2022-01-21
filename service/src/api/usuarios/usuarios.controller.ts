import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Status, Usuario as UsuarioModel } from '@prisma/client';
import { UsuarioService } from '../../domain/usuario.service';
import { HashingService } from '../../auth/hashing.service';
import { PostagemService } from 'src/domain/postagem.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly postagemService: PostagemService,
    private readonly hashingService: HashingService) { }

  @UseGuards(JwtAuthGuard)
  @Post('amigos')
  async postAmigo(
    @Request() req,
    @Body() body: { usuario}
  ): Promise<any> {
    const usuario = await this.usuarioService.usuario({
      id: req.user.userId
    });

    const outroUsuario = await this.usuarioService.usuario({
      id: body.usuario
    });

    return this.usuarioService.novaAmizade(usuario, outroUsuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/feed')
  async getFeed(@Request() req): Promise<Status[]> {
    const usuario = await this.usuarioService.usuario({
      id: req.user.userId
    });

    return this.postagemService.status({
      where: {
        usuario: {  
          faculdadeId: usuario.faculdadeId       
        }
      },
      orderBy: {
        criadoEm: 'desc'
      },
      include: {
        usuario: {
          include: {
            amigos: true
          }
        },
        commentarios: true,
      }
    })

  }

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
