import { IsOptional, IsString } from "class-validator";

export class UpdateEquipoDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre?: string;

  @IsOptional()
  @IsString({ message: 'El escudo debe ser una cadena de texto' })
  escudo?: string;

  @IsOptional()
  @IsString({ message: 'La localización debe ser una cadena de texto' })
  location?: string;

}
