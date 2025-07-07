import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from 'src/core/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

     // ACTUALIZACION

     
    //  Con el sigup agrego datos
  @Public()
  @Post('signup')
  signUp(@Body() CreateUserDto: CreateUserDto){
    return this. authService.createUser(CreateUserDto);
  }



  @UseGuards(LocalAuthGuard) // LocalAuthGuard se encarga de la 
// validacion de la credencial

  @Public()
  @Post('login')
  signIn(@Request() req) {
    // me envuelve el jwt autenticado
    return this.authService.login(req.user);
  }


  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.user;
  }
}
