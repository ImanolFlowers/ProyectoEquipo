import { Temporada } from '../../domain/entities/temporada.entity';
import { Prisma, Temporada as PrismaTemporada } from 'generated/prisma';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';

export class TemporadaMapper {
  static toDomain(p: PrismaTemporada): Temporada {
    return new Temporada(
      p.id,
      p.estado,
      p.createdAt,
      p.updatedAt
    );
  }

  static toPersistence(entity: Temporada): Prisma.TemporadaCreateInput {
    return {
      id: entity.id,
      estado: entity.estado,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt ?? new Date(),
    };
  }

  static toUpdateData(dto: UpdateTemporadaDto) {
    return { ...dto };
  }
}
