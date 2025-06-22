import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


    async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    // debemos validar la contrase;a que debe estar cifrada
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  // metodo que genera el  JWT
  async login(user: any) {
    // objeto que ira en el JWT
    const payload = { username: user.name, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
