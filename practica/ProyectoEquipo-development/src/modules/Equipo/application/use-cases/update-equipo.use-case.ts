import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEquipoDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'El escudo debe ser una cadena de texto' })
  escudo?: string;

  @IsOptional()
  @IsString({ message: 'La localización debe ser una cadena de texto' })
  location?: string;

  @IsNotEmpty({ message: 'El representante es obligatorio' })
  @IsString({ message: 'El representante debe ser una cadena de texto' })
  representante: string;
}
