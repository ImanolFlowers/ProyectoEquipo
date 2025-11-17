import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Posicion } from '../../../../../generated/prisma/client';

export class UpdateJugadorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apellidos?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  numero?: number;

  @ApiPropertyOptional({ enum: Posicion })
  @IsOptional()
  posicion?: Posicion;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  posicionDetalle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  foto?: string;
}
