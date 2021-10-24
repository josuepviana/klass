import {
  Controller,
  Get,
} from '@nestjs/common';
import { Faculdade as FaculdadeModel } from '@prisma/client';
import { AppService } from './app.service';
import { FaculdadeService } from './global/faculdade.service';


@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly faculdadeService: FaculdadeService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('faculdades')
  async getFaculdades(): Promise<FaculdadeModel[]> {
    return this.faculdadeService.faculdades({});
  }
}
