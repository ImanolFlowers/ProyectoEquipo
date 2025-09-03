import { Prisma, Temporada as PrismaTemporada } from 'generated/prisma';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';
import { Temporada } from '../../domain/entities/temporada.entity';

export class TemporadaMapper {
  
  // de Prisma a Entidad
  static toDomain(p: PrismaTemporada): Temporada {
    return new Temporada(
      p.id,
      p.nombre,
      p.estado === 'ACTIVA', // aqui es donde el estado debe estar activa
      p.createdAt,
      p.updatedAt
    );
  }

  // de Entidad a Prisma
  static toPersistence(entity: Temporada): Prisma.TemporadaCreateInput {
    return {
      id: entity.id,
      nombre: entity.nombre,
      estado: entity.activa ? 'ACTIVA' : 'FINALIZADA', // mapear activa -> estado
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt ?? new Date(),
    };
  }

  // para la actualizacion
  static toUpdateData(dto: UpdateTemporadaDto) {
    const data: any = { ...dto };
    if (dto.activa !== undefined) {
      data.estado = dto.activa ? 'ACTIVA' : 'FINALIZADA';
      delete data.activa;
    }
    return data;
  }
}
