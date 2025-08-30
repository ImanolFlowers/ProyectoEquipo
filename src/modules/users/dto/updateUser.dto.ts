import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({required: true, description: "Nombre del usuario"})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({required:true, description: 'Apellido del usuario'})
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiProperty({required: true, description: "Contraseña del usuario"})
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({required: true, description: "Email del usuario"})
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({required: true, description: "usename del usuario"})
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({required: true, description: "Telefono del usuario"})
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({required: true, description: "Foto del usuario"})
  @IsOptional()
  @IsString()
  image?: string;
}
