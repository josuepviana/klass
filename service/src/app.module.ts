import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './api/app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DomainModule } from './domain/domain.module';
import { PostsController } from './api/posts/posts.controller';
import { FaculdadesController } from './api/faculdades/faculdades.controller';
import { UsuariosController } from './api/usuarios/usuarios.controller';

@Module({
  imports: [AuthModule, UsersModule, DomainModule],
  controllers: [AppController, PostsController, FaculdadesController, UsuariosController],
  providers: [AppService],
})
export class AppModule {}
