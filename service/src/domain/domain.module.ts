import { Module } from '@nestjs/common';
import { FaculdadeService } from './faculdade.service';
import { PrismaService } from './prisma.service';
import { UsuarioService } from './usuario.service';

@Module({
    providers: [
        PrismaService, 
        UsuarioService, 
        FaculdadeService
    ],
    exports: [UsuarioService]
})
export class DomainModule {}
