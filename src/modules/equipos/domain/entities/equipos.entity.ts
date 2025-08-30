import { ApiProperty } from "@nestjs/swagger";

export class Equipo {
  @ApiProperty()
  id: string;

  @ApiProperty({required: true, description: "Nombre del equipo"})
  nombre: string;

  @ApiProperty({required: true, description: "Escudo del equipo"})
  escudo?: string | null;

  @ApiProperty({required: true, description: "Localidad del equipo"})
  localidad?: string | null;

  @ApiProperty({required: true, description: "Id del entrenador del equipo"})
  entrenadorId: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()@ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date | null;
}
