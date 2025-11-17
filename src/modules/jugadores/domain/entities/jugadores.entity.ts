import { ApiProperty } from '@nestjs/swagger';
import { Posicion } from 'generated/prisma/client';

export class Jugador {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellidos: string;

  @ApiProperty()
  numero: number;

  @ApiProperty({ enum: Posicion })
  posicion: Posicion;

  @ApiProperty({ required: false, nullable: true })
  posicionDetalle: string | null;

  @ApiProperty({ required: false, nullable: true })
  foto: string | null;

  @ApiProperty()
  equipoId: string;

    @ApiProperty()
   nombreEquipo?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
