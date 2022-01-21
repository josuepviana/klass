import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostagemService } from 'src/domain/postagem.service';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly postagemService: PostagemService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  createStatus(
    @Request() req,
    @Body() postBody: { texto: string }) {
    return this.postagemService.createStatus({
      texto: postBody.texto,
      usuario: {
        connect: {
          id: req.user.userId
        }
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getStatus(@Request() req) {
    return this.postagemService.status({
        where: {
          usuarioId: req.user.userId,
        },
        include: {
          usuario: {
            include: {
              amigos: true
            }
          },
          commentarios: true
        }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/comentarios')
  createComentarios(
    @Param('id') postId,
    @Body() postBody: { texto: string, username: string }) {

    return this.postagemService.createComentario({
      texto: postBody.texto,
      usuario: {
        connect: {
          username: postBody.username
        }
      },
      status: {
        connect: {
          id: +postId,
        }
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/comentarios')
  getComentarios(@Param('id') postId) {
    return this.postagemService.comentarios({
      where: {
        statusId: +postId
      },
      include: {
        usuario: {
          include: {
            amigos: true
          }
        },
      }
    });
  }
}
