import { Equipo as PrismaEquipo } from 'generated/prisma';
import { UpdateEquipoDto } from "../../application/dtos/update-equipo.dto";
import { Equipo } from "../../domain/entities/equipos";


export class EquipoMapper {
  static toDomain(p: PrismaEquipo): Equipo {
return new Equipo(p.id, p.nombre, p.activa, p.createdAt, p.escudo, p.location, p.representanteId);
  }

  static toPersistence(entity: Equipo): PrismaEquipo{
    return {
    id: entity.id,
    nombre: entity.nombre,
    escudo: entity.escudo ?? "",
    location: entity.location ?? "",
    representanteId: entity.representanteId ?? "",
    activa: entity.activa,
    createdAt: entity.createdAt,
};
  }

  static toUpdateData(dto: UpdateEquipoDto) {
    return { ...dto };
  }
}
