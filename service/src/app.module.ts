import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [AuthModule, UsersModule, DomainModule,
      // ServeStaticModule.forRoot({
      //   rootPath: join(__dirname, '..', '..', 'img'),
      // })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
