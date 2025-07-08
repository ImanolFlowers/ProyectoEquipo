import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTemporadaDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;
}
