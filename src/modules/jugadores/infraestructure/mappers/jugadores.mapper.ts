
import { Jugador as JugadorPrisma } from 'generated/prisma/client';
import { Jugador } from '../../domain/entities/jugadores.entity';

export class JugadorMapper {
  static toDomain(prismaJugador: any): Jugador {
    return {
      id: prismaJugador.id,
      nombre: prismaJugador.nombre,
      apellidos: prismaJugador.apellidos,
      numero: prismaJugador.numero,
      posicion: prismaJugador.posicion,
      posicionDetalle: prismaJugador.posicionDetalle ?? null,
      foto: prismaJugador.foto ?? null,
      equipoId: prismaJugador.equipoId,
      nombreEquipo: prismaJugador.equipo?.nombre ?? null,
      createdAt: prismaJugador.createdAt,
      updatedAt: prismaJugador.updatedAt,
    };
  }

  static toDomainMany(prismaJugadores: any[]): Jugador[] {
    return prismaJugadores.map(this.toDomain);
  }
}