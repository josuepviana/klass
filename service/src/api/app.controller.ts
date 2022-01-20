import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UsuarioService } from '../domain/usuario.service';


@Controller({})
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  sleep(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    await this.sleep(2_000);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usuarioService.usuarioProfile({
      id: req.user.userId
    });
  }
}
