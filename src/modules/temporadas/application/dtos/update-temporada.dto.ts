import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoTemporada } from '../../../../../generated/prisma';

export class UpdateTemporadaDto {
  @ApiPropertyOptional({ enum: EstadoTemporada })
  @IsOptional()
  @IsEnum(EstadoTemporada)
  estado?: EstadoTemporada;
}
