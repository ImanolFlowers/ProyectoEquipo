import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let tokenjwt: JwtStrategy;
  let localito: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],

       providers: [AuthService, LocalStrategy, JwtStrategy],
       imports: [
           UsersModule, 
           PassportModule,
           JwtModule.register({
           secret: process.env.JWT_SECRET,
           signOptions: { expiresIn: process.env.JWT_EXP },
           }),],

    }).compile();

    controller = module.get<AuthController>(AuthController);
    tokenjwt = module.get<JwtStrategy>(JwtStrategy);
    localito = module.get<LocalStrategy>(LocalStrategy);
  });

  it('El controler debe tener una instancia ', () => {
    expect(controller).toBeDefined();
  });

  it('El tokenjwt debe tener una instancia', () => {
    expect(tokenjwt).toBeDefined();
  });

  it('El local strategi debe tener el metodo validate', () => {
    expect(localito.validate).toBeDefined();
  });

});
