import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Faculdade,
  Prisma
} from '@prisma/client';


@Injectable()
export class FaculdadeService {
  constructor(private prisma: PrismaService) {}

  async faculdade(faculdadeWhereUniqueInput: Prisma.FaculdadeWhereUniqueInput): Promise<Faculdade | null> {
    return this.prisma.faculdade.findUnique({
      where: faculdadeWhereUniqueInput,
    });
  }

  async faculdades(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FaculdadeWhereUniqueInput;
    where?: Prisma.FaculdadeWhereInput;
    orderBy?: Prisma.FaculdadeOrderByWithRelationInput;
  }): Promise<Faculdade[]> {
    return this.prisma.faculdade.findMany({
      ...params,
      include: {
        cursos: {
          select: {
            id: true,
            nome: true,
          }
        }
      }
    });
  }

  async createUser(data: Prisma.FaculdadeCreateInput): Promise<Faculdade> {
    return this.prisma.faculdade.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.FaculdadeWhereUniqueInput;
    data: Prisma.FaculdadeUpdateInput;
  }): Promise<Faculdade> {
    const { where, data } = params;

    return this.prisma.faculdade.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.FaculdadeWhereUniqueInput): Promise<Faculdade> {
    return this.prisma.faculdade.delete({
      where,
    });
  }
}