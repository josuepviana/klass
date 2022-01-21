import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Usuario,
  Prisma
} from '@prisma/client';


@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async usuario(usuarioWhereUniqueInput: Prisma.UsuarioWhereUniqueInput): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: usuarioWhereUniqueInput,
    });
  }

  async novaAmizade(usuario: Usuario, outroUsuario: Usuario): Promise<any> {
    
    return this.prisma.$executeRaw`INSERT INTO _amigos VALUES(${usuario.id}, ${outroUsuario.id});`;
  }

  async usuarioProfile(usuarioWhereUniqueInput: Prisma.UsuarioWhereUniqueInput): Promise<Usuario | null> {

    const usuario = await this.prisma.usuario.findUnique({
      where: usuarioWhereUniqueInput,
      include: {
        faculdade: true,
        curso: true
      },
    });

    delete usuario.password;

    return usuario;
  }

  async usuarios(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsuarioWhereUniqueInput;
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput;
  }): Promise<Usuario[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.usuario.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UsuarioWhereUniqueInput;
    data: Prisma.UsuarioUpdateInput;
  }): Promise<Usuario> {
    const { where, data } = params;

    return this.prisma.usuario.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UsuarioWhereUniqueInput): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where,
    });
  }
}