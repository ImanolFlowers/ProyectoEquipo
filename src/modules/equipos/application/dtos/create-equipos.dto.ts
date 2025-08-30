import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEquipoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required: true, description: "Nombre del equipo"})
  nombre: string;

  @IsOptional()
  @IsString()
  @ApiProperty({required: true, description: "Escudo del equipo"})
  escudo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({required: true, description: "localidad del equipo"})
  localidad?: string
}
