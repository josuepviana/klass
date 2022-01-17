
import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FaculdadeService } from '../../domain/faculdade.service';

@Controller('faculdades')
export class FaculdadesController {

  constructor(private readonly faculdadeService: FaculdadeService) { }

  @Get()
  getFaculdades() {
    return this.faculdadeService.faculdades({
      // parameters here
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/feed')
  getFeed(@Param('id') faculdadeId: string) {
    return this.faculdadeService.feed({
      id: +faculdadeId
    });
  }
}
