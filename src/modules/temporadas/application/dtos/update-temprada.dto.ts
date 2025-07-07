import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateTemporadaDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre?: string;
}