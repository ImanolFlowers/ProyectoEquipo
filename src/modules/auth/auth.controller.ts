import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../../core/decorators/public.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { LoginResponse } from './responsive/login-response';
import { signupResponse } from './responsive/signup-response';

@ApiBearerAuth()
@ApiTags('Autenticaciones')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  //  Con el sigup agrego datos
  @ApiOkResponse({type: signupResponse})
  @ApiOperation({summary: "Creacion de usuario"})
  @Public()
  @Post('signup')
  signUp(@Body() CreateUserDto: CreateUserDto){
    return this. authService.createUser(CreateUserDto);
  }


  @ApiOperation({summary: "Autenticacion de usuario"})
  @ApiOkResponse({type: LoginResponse})
  @UseGuards(LocalAuthGuard) // LocalAuthGuard se encarga de la 
// validacion de la credencial
  @Public()
    // se le desabilita el de 200
   @HttpCode(200)
  @Post('login')
  async signIn(@Request() req, @Body() credential: LoginDto) {
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
