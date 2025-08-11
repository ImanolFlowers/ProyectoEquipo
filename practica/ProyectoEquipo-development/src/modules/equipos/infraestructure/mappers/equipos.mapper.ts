import { EquipoConEntrenadorDto } from '../../application/dtos/equipo-con-entrenador.dto';
import { Equipo } from '../../domain/entities/equipos.entity';


export class EquipoMapper {
  static toDomain(prismaEquipo: any): Equipo {
    return {
      id: prismaEquipo.id,
      nombre: prismaEquipo.nombre,
      escudo: prismaEquipo.escudo,
      localidad: prismaEquipo.localidad,
      entrenadorId: prismaEquipo.entrenadorId,
      active: prismaEquipo.active,
      createdAt: prismaEquipo.createdAt,
      updatedAt: prismaEquipo.updatedAt,
    };
  }

  static toDomainMany(prismaEquipos: any[]): Equipo[] {
    return prismaEquipos.map(this.toDomain);
  }

  static toDtoWithEntrenador(prismaEquipo: any): EquipoConEntrenadorDto {
    const entrenador = prismaEquipo.entrenador;
    const nombreCompleto = [entrenador.name, entrenador.apellido].filter(Boolean).join(' ');
    return {
      id: prismaEquipo.id,
      nombre: prismaEquipo.nombre,
      escudo: prismaEquipo.escudo,
      localidad: prismaEquipo.localidad,
      entrenadorNombreCompleto: nombreCompleto,
      active: prismaEquipo.active,
      createdAt: prismaEquipo.createdAt,
      updatedAt: prismaEquipo.updatedAt,
    };
  }
}
