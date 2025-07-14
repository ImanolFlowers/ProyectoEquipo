import { IsOptional, IsString } from 'class-validator';

export class UpdateEquipoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  escudo?: string;

  @IsOptional()
  @IsString()
  localidad?: string;
}