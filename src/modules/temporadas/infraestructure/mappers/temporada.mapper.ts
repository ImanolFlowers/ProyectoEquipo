import { Prisma, Temporada as PrismaTemporada } from 'generated/prisma';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';
import { Temporada } from '../../domain/entities/temporada.entity';

export class TemporadaMapper {
  static toDomain(p: PrismaTemporada): Temporada {
  return new Temporada(p.id, p.nombre, p.activa, p.createdAt, p.updatedAt);
}


  static toPersistence(entity: Temporada): Prisma.TemporadaCreateInput {
  return {
    id: entity.id,
    nombre: entity.nombre,
    activa: entity.activa,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt ?? new Date(),
  };
}


  static toUpdateData(dto: UpdateTemporadaDto) {
    return { ...dto };
  }
}