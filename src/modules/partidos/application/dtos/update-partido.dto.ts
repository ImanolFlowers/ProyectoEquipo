import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min, IsNotEmpty } from "class-validator";
import { EstadoPartido } from "../../domain/entities/partidos.entity";

export class UpdatePartidoDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsString()
  hora?: string;

  @IsOptional()
  @IsString()
  lugar?: string;

  @IsOptional()
  @IsInt()
  jornada?: number;

  @IsOptional()
  @IsEnum(EstadoPartido)
  estado?: EstadoPartido;

  @IsOptional()
  @IsInt()
  @Min(0)
  golesEquipoA?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  golesEquipoB?: number;

  @IsOptional()
  @IsNotEmpty()
  equipoAId?: string;

  @IsOptional()
  @IsNotEmpty()
  equipoBId?: string;
}
