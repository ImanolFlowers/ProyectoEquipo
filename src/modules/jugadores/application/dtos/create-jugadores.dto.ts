import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Posicion } from '../../../../../generated/prisma/client';

export class CreateJugadorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  numero: number;

  @ApiProperty({ enum: Posicion })
  @IsNotEmpty()
  posicion: Posicion;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  posicionDetalle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  foto?: string;
}
