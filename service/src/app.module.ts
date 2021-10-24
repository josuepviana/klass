import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaculdadeService } from './global/faculdade.service';
import { HashingService } from './global/hashing.service';
import { PrismaService } from './global/prisma.service';
import { UsuarioService } from './global/usuario.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FaculdadeService, UsuarioService, HashingService, PrismaService],
})
export class AppModule {}
