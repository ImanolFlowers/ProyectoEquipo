import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEquipoDto {
  @ApiProperty({})
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  escudo?: string;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  localidad?: string;
}
