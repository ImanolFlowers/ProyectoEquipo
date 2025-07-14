import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEquipoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  escudo?: string;

  @IsOptional()
  @IsString()
  localidad?: string;
}