import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // metodo para registrar usuario
  async createUser(userData: CreateUserDto){
    return this.usersService.createUser(userData)
  }

    async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    // debemos validar la contrase;a que debe estar cifrada

    // si no existe usuario debe crear una excepcion
    if(!user){
      throw new UnauthorizedException()
    }


    // validar la contraseña que debe estar cifrada
    const isMatch = await bcrypt.compare(pass, user.password);

    // sino coincide, crea excepcion
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    return result;
  }

  // metodo que genera el  JWT
  async login(user: any) {
    // objeto que ira en el JWT
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
