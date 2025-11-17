import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreatePartidoDto {
  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  hora: string;

  @IsNotEmpty()
  @IsString()
  lugar: string;

  @IsInt()
  @Min(1)
  jornada: number;

  @IsOptional()
  temporadaId?: string;

  @IsNotEmpty()
  equipoAId: string;

  @IsNotEmpty()
  equipoBId: string;
}
