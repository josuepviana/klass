
import { Controller, Get, Param, Request,  UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FaculdadeService } from '../../domain/faculdade.service';

@Controller('faculdades')
export class FaculdadesController {

  constructor(
    private readonly faculdadeService: FaculdadeService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/feed')
  getProfile(@Param('id') faculdadeId: string) {
    return this.faculdadeService.feed({
      id: +faculdadeId
    });
  }
}
