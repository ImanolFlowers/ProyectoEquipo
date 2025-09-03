import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { EstadoTemporada } from '../../../../../generated/prisma/client';


export class CreateTemporadaDto {
  @ApiProperty({ required: true, description: "Nombre de la temporada" })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({ required: false, description: "Estado de la temporada" })
  @IsEnum(EstadoTemporada, { message: 'El estado debe ser ACTIVA o FINALIZADA' })
  @IsOptional()
  estado?: EstadoTemporada;
}
