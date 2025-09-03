import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateTemporadaDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre?: string;

  @ApiProperty({ required: false, description: 'Estado activo de la temporada' })
  @IsOptional()
  @IsBoolean({ message: 'activa debe ser booleano' })
  activa?: boolean;
}
