import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Status,
  Prisma,
  Comentario
} from '@prisma/client';


@Injectable()
export class PostagemService {
  constructor(private prisma: PrismaService) {}

  async createStatus(data: Prisma.StatusCreateInput): Promise<Status> {
    return this.prisma.status.create({
      data
    });
  }

  async status(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StatusWhereUniqueInput;
    where?: Prisma.StatusWhereInput;
    orderBy?: Prisma.StatusOrderByWithRelationInput;
    include?: Prisma.StatusInclude
  }): Promise<Status[]> {
    const { skip, take, cursor, where, orderBy, include } = params;

    return this.prisma.status.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    });
  }

  async createComentario(data: Prisma.ComentarioCreateInput): Promise<Comentario> {
    return this.prisma.comentario.create({
      data
    });
  }

  async comentarios(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ComentarioWhereUniqueInput;
    where?: Prisma.ComentarioWhereInput;
    orderBy?: Prisma.ComentarioOrderByWithRelationInput;
    include?: Prisma.ComentarioInclude
  }): Promise<Status[]> {
    const { skip, take, cursor, where, orderBy, include } = params;

    return this.prisma.comentario.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    });
  }
}