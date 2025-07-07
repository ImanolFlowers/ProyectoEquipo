import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  // ACTUALIZADO
  // metodo para registrar usuario
  async createUser(userData: CreateUserDto){
    return this.usersService.createUser(userData)
  }

    async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    // debemos validar la contrase;a que debe estar cifrada
    if(!user){
      throw new UnauthorizedException()
    }


    // valida la contrase;a cifrada, sino manda la ecepcion
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    // HASTA AQUI


    const { password, ...result } = user;
    return result;
  }

  // metodo que genera el  jwt
  async login(user: any) {
  const payload = { username: user.username, sub: user.id, role: user.role };
  return {
    access_token: this.jwtService.sign(payload),
  };
}

}
