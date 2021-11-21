import { Module } from '@nestjs/common';
import { FaculdadeService } from './faculdade.service';
import { PostagemService } from './postagem.service';
import { PrismaService } from './prisma.service';
import { UsuarioService } from './usuario.service';

@Module({
    providers: [
        PrismaService, 
        UsuarioService, 
        FaculdadeService,
        PostagemService
    ],
    exports: [UsuarioService, PostagemService, FaculdadeService]
})
export class DomainModule {}
