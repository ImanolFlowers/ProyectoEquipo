import { CreateTemporadaDto } from '../../application/dtos/create-temporada.dto';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';
import { Temporada } from '../entities/temporada.entity';

export abstract class ITemporadasRepository {
  // creacion de temporada
  abstract create(dto: CreateTemporadaDto): Promise<Temporada>;

  // traer las temporadas creadas
  abstract findAll(): Promise<Temporada[]>;

  // traer solo la temporada por su id (para proximos modulos quyiza)
  abstract findById(id: string): Promise<Temporada | null>;

  // actualizacion de temporada ya sea su estado
  abstract update(id: string, dto: UpdateTemporadaDto): Promise<Temporada>;

  // esta hace la eliminacion de temporada
  abstract delete(id: string): Promise<void>;

  // esta me trae la temporada activa
  abstract findActive(): Promise<Temporada | null>;
}
