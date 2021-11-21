import {
  Body,
  Controller,
  Get,
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
          usuario: true,
          commentarios: true
        }
    });
  }
}
