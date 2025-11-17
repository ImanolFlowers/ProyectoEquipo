import { Partido, EstadoPartido } from '../../domain/entities/partidos.entity';

export class PartidoMapper {
    static toDomain(prismaPartido: any): Partido {
        return new Partido(
        prismaPartido.id,
        prismaPartido.fechaHora,
        prismaPartido.lugar,
        prismaPartido.estado as EstadoPartido,
        prismaPartido.jornada,
        prismaPartido.temporadaId,
        prismaPartido.equipoAId,
        prismaPartido.equipoA?.nombre ?? null,
        prismaPartido.equipoBId,
        prismaPartido.equipoB?.nombre ?? null,
        prismaPartido.golesEquipoA,
        prismaPartido.golesEquipoB,
        prismaPartido.createdAt,
        prismaPartido.updatedAt
        );
    }
}
