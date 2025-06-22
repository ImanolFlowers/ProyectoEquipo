import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

@UseGuards(LocalAuthGuard) // LocalAuthGuard se encarga de la 
// validacion de la credencial
  @Post('login')
  signIn(@Request() req) {
    // evolver el JWT Del usuario autenticado
    return this.authService.login(req.user);
  }

  
@UseGuards(LocalAuthGuard)
@Post('logout')
async logout(@Request() req) {
  return req.user;
}



}
