import { IsString, IsOptional } from 'class-validator';

export class CreateEquipoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  escudo?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  representante: string;
}
