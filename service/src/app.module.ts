import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaculdadeService } from './global/faculdade.service';
import { PrismaService } from './global/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FaculdadeService, PrismaService],
})
export class AppModule {}
