import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export enum Role {
  ARBITRO = 'ARBITRO',
  ENTRENADOR = 'ENTRENADOR',
  VISITANTE = 'VISITANTE',
}

export class CreateUserDto {
  @ApiProperty({required: true, description: "Nombre del usuario"})
  @IsString()
  name: string;

  @ApiProperty({required: true, description: "Apellido del usuario"})
  @IsString()
  @IsOptional()
  apellido?: string;

  @ApiProperty({required: true, description: "Usuario de la presona que se registra"})
  @IsString()
  username: string;

  @ApiProperty({required: true, description: "Email de el usuario"})
  @IsEmail()
  email: string;

  @ApiProperty({required: true, description: "Contraseña de la persona"})
  @IsString()
  password: string;

  @ApiProperty({required: true, description: "Rol de la persona"})
  @IsEnum(Role)
  role: Role;
}
