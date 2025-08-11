import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export enum Role {
  ARBITRO = 'ARBITRO',
  ENTRENADOR = 'ENTRENADOR',
  VISITANTE = 'VISITANTE',
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
