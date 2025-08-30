import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

       providers: [AuthService, LocalStrategy, JwtStrategy],
             imports: [
                 UsersModule, 
                 PassportModule,
                 JwtModule.register({
                 secret: process.env.JWT_SECRET,
                 signOptions: { expiresIn: process.env.JWT_EXP },
                 }),],
                 controllers: [AuthController],

    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
