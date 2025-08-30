import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { Public } from './core/decorators/public.decorator';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //lo cambie a puclic
@Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // ejemploo de ruta protegida
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
